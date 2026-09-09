import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllDeliveryManagementTable from "../../ui/Tables/AdminAllDeliveryManagementTable";
import AdminGearDeliveryTable from "../../ui/Tables/AdminGearDeliveryTable";
import AdminWorkshopDeliveryTable from "../../ui/Tables/AdminWorkshopDeliveryTable";
import DeliveryManagementMakePaymentModal from "../../ui/Modal/DeliveryManagement/DeliveryManagementMakePaymentModal";
import ReusableTabs from "../../ui/ReusableTabs";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import {
  useEverOrderMakePaymentMutation,
  useGearOrderMakePaymentMutation,
  useGetDeliveryManagementQuery,
  useWorkshopOrderMakePaymentMutation,
} from "../../redux/features/deliveryManagement/deliveryManagementApi";
import { IDeliveryManagement } from "../../types/deliveryManagement.type";
import { IWorkshopDelivery } from "../../types/workshopDelivery.type";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

type ActiveTab = "professional" | "gear" | "workshop";

const AdminDeliveryManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("professional");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const limit = 12;

  const [showViewPaymentModal, setShowViewPaymentModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<
    IDeliveryManagement | IWorkshopDelivery | null
  >(null);

  const [everOrderMakePayment] = useEverOrderMakePaymentMutation();
  const [gearOrderMakePayment] = useGearOrderMakePaymentMutation();
  const [workshopOrderMakePayment] = useWorkshopOrderMakePaymentMutation();

  const queryType =
    activeTab === "professional"
      ? "professional"
      : activeTab === "gear"
        ? "gear"
        : "workshop";

  const { data, isFetching } = useGetDeliveryManagementQuery(
    {
      limit,
      page,
      searchTerm: searchText,
      type: queryType,
      paymentStatus: paymentFilter,
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 600000 }
  );

  const total = data?.data?.meta?.total || 0;
  const orders = data?.data?.orders || [];

  console.log(orders)

  const showPayment = (record: IDeliveryManagement | IWorkshopDelivery) => {
    setCurrentRecord(record);
    setShowViewPaymentModal(true);
  };

  const handleCancel = () => {
    setShowViewPaymentModal(false);
    setCurrentRecord(null);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setPage(1);
    setPaymentFilter("");
  };

  const handlePayment = async () => {
    if (!currentRecord) return;
    let res;
    if (activeTab === "professional") {
      res = await tryCatchWrapper(
        everOrderMakePayment,
        { params: currentRecord._id },
        "Making payment..."
      );
    } else if (activeTab === "gear") {
      res = await tryCatchWrapper(
        gearOrderMakePayment,
        { params: currentRecord._id },
        "Making payment..."
      );
    } else {
      res = await tryCatchWrapper(
        workshopOrderMakePayment,
        { params: currentRecord._id },
        "Making payment..."
      );
    }
    if (res?.success) handleCancel();
  };

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
          Delivery Management
        </p>

        <ReuseSearchInput
          placeholder="Search ..."
          setSearch={setSearchText}
          setPage={setPage}
        />
      </div>

      <ReuseSelect
        name=""
        options={[
          { label: "All", value: "" },
          { label: "Paid", value: "paid" },
          { label: "Unpaid", value: "unpaid" },
        ]}
        onChange={(val) => {
          setPaymentFilter(val);
          setPage(1);
        }}
        value={paymentFilter}
        selectClassName="!w-[130px]"
      />
      <ReusableTabs<ActiveTab>
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "professional",
            content: (
              <AdminAllDeliveryManagementTable
                data={orders as IDeliveryManagement[]}
                loading={isFetching}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearDeliveryTable
                data={orders as IDeliveryManagement[]}
                loading={isFetching}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },
          {
            label: "Workshop",
            value: "workshop",
            content: (
              <AdminWorkshopDeliveryTable
                data={orders as IWorkshopDelivery[]}
                loading={isFetching}
                showViewPaymentModal={showPayment}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <DeliveryManagementMakePaymentModal
        isModalVisible={showViewPaymentModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handlePayment={handlePayment}
        description={
          activeTab === "workshop"
            ? "Are you sure you want to pay the instructor?"
            : "Are you sure you want to make this payment?"
        }
      />
    </div>
  );
};

export default AdminDeliveryManagement;
