/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import ProfessionalOrderManagementTable from "../../ui/Tables/OrderManagement/ProfessionalOrderManagementTable";
import GearOrderManagementTable from "../../ui/Tables/OrderManagement/GearOrderManagementTable";
import AdminOrderManagementOverview from "../../Components/Dashboard/AdminOrderManagement/AdminOrderManagementOverview";
import {
  useCancelGearOrderMutation,
  useCancelOrderMutation,
  useGetAllGearOrderManagementQuery,
  useGetAllOrderManagementQuery,
} from "../../redux/features/orderManagement/orderManagementApi";
import { IEventOrder, IGearOrder } from "../../types";
import ViewOrderManagementModal from "../../ui/Modal/OrderManagement/ViewOrderManagementModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import CancelModalWithReason from "../../ui/Modal/CancelModalWithReason";
import GearOrderViewModal from "../../ui/Modal/OrderManagement/GearOrderViewModal";

const AdminOrderManagement = () => {
  const [cancelOrder] = useCancelOrderMutation();
  const [cancelGearOrder] = useCancelGearOrderMutation();

  const [activeTab, setActiveTab] = useState<"photographyVideography" | "gear">(
    "photographyVideography"
  );
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const { data, isFetching } = useGetAllOrderManagementQuery(
    {
      limit,
      page,
      searchTerm: searchText,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== "photographyVideography",
      pollingInterval: 600000
    }
  );

  const eventOrder: IEventOrder[] = data?.data || [];
  const totalEventOrder = data?.meta?.total || 0;

  console.log("Event Order ==>", eventOrder);

  const { data: gearData, isFetching: isGearFetching } =
    useGetAllGearOrderManagementQuery(
      {
        limit,
        page,
        searchTerm: searchText,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: activeTab === "photographyVideography",
        pollingInterval: 600000
      }
    );

  const gearOrder: IGearOrder[] = gearData?.data?.data || [];
  const totalGearOrder = gearData?.meta?.total || 0;


  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [showCancelPaymentModal, setShowCancelPaymentModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IEventOrder | null>(null);

  const showViewModal = (record: IEventOrder) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showCancelModal = (record: IEventOrder) => {
    setShowCancelPaymentModal(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setCurrentRecord(null);
    setShowCancelPaymentModal(false);
    setIsViewModalVisible(false);
  };

  const [isViewGearModalVisible, setIsViewGearModalVisible] = useState(false);
  const [isCancelGearModal, setisCancelGearModal] = useState(false);
  const [currentGearRecord, setCurrentGearRecord] = useState<IGearOrder | null>(
    null
  );

  const showViewGearModal = (record: IGearOrder) => {
    setCurrentGearRecord(record);
    setIsViewGearModalVisible(true);
  };

  const showCancelGearModal = (record: IGearOrder) => {
    setisCancelGearModal(true);
    setCurrentGearRecord(record);
  };

  const handleGearCancel = () => {
    setCurrentGearRecord(null);
    setisCancelGearModal(false);
    setIsViewGearModalVisible(false);
  };

  const handleCancelOrder = async (values: any, data: IEventOrder) => {
    const res = await tryCatchWrapper(
      cancelOrder,
      { body: values, params: data?._id },
      "Cancelling order..."
    );
    if (res?.success) {
      handleCancel();
    }
  };

  const handleCancelGearOrder = async (values: any, data: IGearOrder) => {
    const res = await tryCatchWrapper(
      cancelGearOrder,
      { body: values, params: data?._id },
      "Cancelling order..."
    );
    if (res?.success) {
      handleGearCancel();
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Order Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <AdminOrderManagementOverview />

      <ReusableTabs<"photographyVideography" | "gear">
        align="left"
        tabs={[
          {
            label: "Photography & Videography",
            value: "photographyVideography",
            content: (
              <ProfessionalOrderManagementTable
                data={eventOrder}
                loading={isFetching}
                showViewModal={showViewModal}
                showCancleModal={showCancelModal}
                setPage={setPage}
                page={page}
                total={totalEventOrder}
                limit={limit}
              />
            ),
          },

          {
            label: "Gear",
            value: "gear",
            content: (
              <GearOrderManagementTable
                data={gearOrder}
                loading={isGearFetching}
                showViewModal={showViewGearModal}
                showCancleModal={showCancelGearModal}
                setPage={setPage}
                page={page}
                total={totalGearOrder}
                limit={limit}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1); // Reset page when changing tabs
        }}
      />
      <ViewOrderManagementModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <GearOrderViewModal
        isViewModalVisible={isViewGearModalVisible}
        handleCancel={handleGearCancel}
        currentRecord={currentGearRecord}
      />

      <CancelModalWithReason
        isCancelModalWithReasonVisible={
          activeTab === "photographyVideography"
            ? showCancelPaymentModal
            : isCancelGearModal
        }
        handleCancel={
          activeTab === "photographyVideography"
            ? handleCancel
            : handleGearCancel
        }
        currentRecord={
          activeTab === "photographyVideography"
            ? currentRecord
            : currentGearRecord
        }
        handleCancelOrder={
          activeTab === "photographyVideography"
            ? handleCancelOrder
            : handleCancelGearOrder
        }
      />
    </div>
  );
};

export default AdminOrderManagement;
