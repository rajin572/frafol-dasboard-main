import { useState, useMemo } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllRefundManagementTable from "../../ui/Tables/AdminAllRefundManagementTable";
import AdminGearRefundTable from "../../ui/Tables/AdminGearRefundTable";
import RefundManagementMakeRefundModal from "../../ui/Modal/RefundManagement/RefundManagementMakeRefundModal";
import ReusableTabs from "../../ui/ReusableTabs";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import { IRefundManagement } from "../../types/refundManagement.type";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useGetCancelledEventOrdersQuery,
  useGetCancelledGearOrdersQuery,
  useEventOrderCompleteRefundMutation,
  useGearOrderCompleteRefundMutation,
} from "../../redux/features/refundManagement/refundManagementApi";

type ActiveTab = "professional" | "gear";

const AdminRefundManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("professional");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const limit = 10;

  const [showViewRefundModal, setShowViewRefundModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IRefundManagement | null>(null);

  // PATCH /event-order/complete-refund/:eventOrderId and /gear-order/complete-refund/:gearOrderId
  const [eventOrderCompleteRefund] = useEventOrderCompleteRefundMutation();
  const [gearOrderCompleteRefund] = useGearOrderCompleteRefundMutation();

  // 1. Photography & Videography refunds: GET /event-order/refund-management
  //    Response: { data: { meta: { total, ... }, result: [...] } }
  const {
    data: eventOrdersData,
    isFetching: isEventOrdersFetching,
    refetch: refetchEventOrders,
  } = useGetCancelledEventOrdersQuery(
    {
      page,
      limit,
      searchTerm: searchText,
      ...(paymentFilter ? { paymentStatus: paymentFilter } : {}),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== "professional",
      pollingInterval: 600000,
    }
  );

  const eventOrdersList: IRefundManagement[] = useMemo(
    () => (Array.isArray(eventOrdersData?.data?.result) ? eventOrdersData.data.result : []),
    [eventOrdersData]
  );

  const eventOrdersTotal: number =
    eventOrdersData?.data?.meta?.total ?? eventOrdersList.length;

  // 2. Gear refunds: GET /gear-order/refund-management (same response shape)
  const {
    data: gearOrdersData,
    isFetching: isGearOrdersFetching,
    refetch: refetchGearOrders,
  } = useGetCancelledGearOrdersQuery(
    {
      page,
      limit,
      searchTerm: searchText,
      ...(paymentFilter ? { paymentStatus: paymentFilter } : {}),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== "gear",
      pollingInterval: 600000,
    }
  );

  const gearOrdersList: IRefundManagement[] = useMemo(
    () => (Array.isArray(gearOrdersData?.data?.result) ? gearOrdersData.data.result : []),
    [gearOrdersData]
  );

  const gearOrdersTotal: number =
    gearOrdersData?.data?.meta?.total ?? gearOrdersList.length;

  // Both endpoints use the same filter: paymentStatus=unpaid (refund still pending) or paid (already refunded).
  const paymentFilterOptions = [
    { label: "All", value: "" },
    { label: "Refund pending", value: "unpaid" },
    { label: "Refunded", value: "paid" },
  ];

  const showRefundModal = (record: IRefundManagement) => {
    setCurrentRecord(record);
    setShowViewRefundModal(true);
  };

  const handleCancel = () => {
    setShowViewRefundModal(false);
    setCurrentRecord(null);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setPage(1);
    setPaymentFilter("");
  };

  const handleRefund = async (record?: IRefundManagement) => {
    const target = record || currentRecord;
    if (!target?._id) return;

    let res;
    if (activeTab === "professional") {
      res = await tryCatchWrapper(
        eventOrderCompleteRefund,
        { params: target._id },
        "Processing refund..."
      );
      if (res) {
        handleCancel();
        refetchEventOrders();
      }
    } else if (activeTab === "gear") {
      res = await tryCatchWrapper(
        gearOrderCompleteRefund,
        { params: target._id },
        "Processing refund..."
      );
      if (res) {
        handleCancel();
        refetchGearOrders();
      }
    }
  };

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
          Refund Management
        </p>

        <ReuseSearchInput
          placeholder="Search ..."
          setSearch={setSearchText}
          setPage={setPage}
        />
      </div>

      <ReuseSelect
        name=""
        options={paymentFilterOptions}
        onChange={(val) => {
          setPaymentFilter(val);
          setPage(1);
        }}
        value={paymentFilter}
        selectClassName="!w-[160px]"
      />

      <ReusableTabs<ActiveTab>
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "professional",
            content: (
              <AdminAllRefundManagementTable
                data={eventOrdersList}
                loading={isEventOrdersFetching}
                showViewRefundModal={showRefundModal}
                setPage={setPage}
                page={page}
                total={eventOrdersTotal}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearRefundTable
                data={gearOrdersList}
                loading={isGearOrdersFetching}
                showViewRefundModal={showRefundModal}
                setPage={setPage}
                page={page}
                total={gearOrdersTotal}
                limit={limit}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <RefundManagementMakeRefundModal
        isModalVisible={showViewRefundModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleRefund={handleRefund}
        description="Are you sure you want to process this refund?"
      />
    </div>
  );
};

export default AdminRefundManagement;
