import { useState, useMemo } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllRefundManagementTable from "../../ui/Tables/AdminAllRefundManagementTable";
import AdminGearRefundTable from "../../ui/Tables/AdminGearRefundTable";
import AdminWorkshopRefundTable from "../../ui/Tables/AdminWorkshopRefundTable";
import RefundManagementMakeRefundModal from "../../ui/Modal/RefundManagement/RefundManagementMakeRefundModal";
import ReusableTabs from "../../ui/ReusableTabs";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import { IRefundManagement, IWorkshopRefund } from "../../types/refundManagement.type";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useGetCancelledEventOrdersQuery,
  useEverOrderMakeRefundMutation,
  // useGetRefundManagementQuery,
  // useGearOrderMakeRefundMutation,
  // useWorkshopOrderMakeRefundMutation,
} from "../../redux/features/refundManagement/refundManagementApi";

type ActiveTab = "professional" | "gear" | "workshop";

// Real response items from API (/event-order?status=cancelled) for Photography & Videography

const INITIAL_GEAR_REFUNDS: IRefundManagement[] = [
  {
    _id: "gear-ref-1",
    orderId: "REF-G2001",
    clientId: {
      _id: "c-1",
      name: "Dominik Svec",
      email: "dominik@example.com",
      profileId: {
        bankName: "VUB Banka",
        accountNumber: "SK9802000000007719223301",
      },
    },
    sellerId: {
      _id: "s-1",
      name: "Martin Kollar",
      email: "martin.k@example.com",
      profileId: {
        bankName: "SLSP Banka",
        accountNumber: "SK6609000000001234567890",
      },
    },
    orderType: "gear",
    gearMarketplaceId: {
      _id: "gear-1",
      authorId: "s-1",
      name: "Sony Alpha A7 IV Body (Mint Condition)",
      price: 1850,
      vatAmount: 370,
      totalVatAmount: 370,
      description: "Like new camera body with shutter count under 5000.",
      condition: "Like New",
      gallery: [],
      shippingCompany: {
        name: "DPD Express",
        price: 15,
      },
      approvalStatus: "approved",
      isDeleted: false,
      createdAt: "2026-07-01T00:00:00.000Z",
      updatedAt: "2026-07-01T00:00:00.000Z",
    },
    refundAmount: 2235,
    price: 2235,
    refundDate: "2026-08-18T16:20:00.000Z",
    status: "cancelled",
    paymentStatus: "Unpaid",
    createdAt: "2026-08-18T16:00:00.000Z",
    updatedAt: "2026-08-18T16:00:00.000Z",
    cancelReason: "Buyer received damaged sensor; seller agreed to return & refund.",
  },
  {
    _id: "gear-ref-2",
    orderId: "REF-G2002",
    clientId: {
      _id: "c-2",
      name: "Lucia Benkova",
      email: "lucia.b@example.com",
      profileId: {
        bankName: "Tatra Banka",
        accountNumber: "SK5511000000004455667788",
      },
    },
    sellerId: {
      _id: "s-2",
      name: "Jakub Varga",
      email: "jakub.v@example.com",
      profileId: {
        bankName: "CSOB Banka",
        accountNumber: "SK2275000000009988776655",
      },
    },
    orderType: "gear",
    gearMarketplaceId: {
      _id: "gear-2",
      authorId: "s-2",
      name: "DJI RS 3 Pro Gimbal Combo",
      price: 680,
      vatAmount: 136,
      totalVatAmount: 136,
      description: "Complete gimbal kit with focus motor.",
      condition: "Good",
      gallery: [],
      shippingCompany: {
        name: "Packeta",
        price: 8,
      },
      approvalStatus: "approved",
      isDeleted: false,
      createdAt: "2026-07-15T00:00:00.000Z",
      updatedAt: "2026-07-15T00:00:00.000Z",
    },
    refundAmount: 824,
    price: 824,
    refundDate: "2026-08-12T13:10:00.000Z",
    status: "cancelled",
    paymentStatus: "Paid",
    createdAt: "2026-08-12T12:00:00.000Z",
    updatedAt: "2026-08-13T10:30:00.000Z",
    cancelReason: "Order canceled prior to shipment dispatch.",
  },
];

const INITIAL_WORKSHOP_REFUNDS: IWorkshopRefund[] = [
  {
    _id: "ws-ref-1",
    orderId: "REF-W3001",
    clientId: {
      _id: "wc-1",
      name: "Kristina Kovacova",
      email: "kristina.k@example.com",
      profileId: {
        bankName: "SLSP Banka",
        accountNumber: "SK1109000000003344556677",
      },
    },
    instructorId: {
      _id: "wi-1",
      name: "Filip Sedlak",
      email: "filip.sedlak@example.com",
      profileId: {
        bankName: "Tatra Banka",
        accountNumber: "SK9911000000001122334455",
      },
    },
    workshopId: {
      _id: "w-1",
      title: "Mastering Studio Lighting & Flash",
      date: "2026-09-25T09:00:00.000Z",
      time: "09:00 - 17:00",
      locationType: "In-Person (Bratislava)",
      vatAmount: 30,
      price: 180,
      mainPrice: 180,
    },
    refundAmount: 180,
    refundStatus: "pending",
    refundPayment: {
      status: "pending",
      amount: 180,
      refundedAt: null,
    },
    paymentStatus: "completed",
    createdAt: "2026-08-20T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
    reason: "Instructor rescheduled date; participant unable to attend new date.",
  },
  {
    _id: "ws-ref-2",
    orderId: "REF-W3002",
    clientId: {
      _id: "wc-2",
      name: "Samuel Balaz",
      email: "samuel.balaz@example.com",
      profileId: {
        bankName: "VUB Banka",
        accountNumber: "SK7702000000005566778899",
      },
    },
    instructorId: {
      _id: "wi-2",
      name: "Andrea Molnar",
      email: "andrea.m@example.com",
      profileId: {
        bankName: "CSOB Banka",
        accountNumber: "SK4475000000001239874561",
      },
    },
    workshopId: {
      _id: "w-2",
      title: "DaVinci Resolve Color Grading Intensive",
      date: "2026-08-05T10:00:00.000Z",
      time: "10:00 - 16:00",
      locationType: "Online Live Stream",
      vatAmount: 25,
      price: 150,
      mainPrice: 150,
    },
    refundAmount: 150,
    refundStatus: "refunded",
    refundPayment: {
      status: "received",
      amount: 150,
      refundedAt: "2026-08-04T15:00:00.000Z",
    },
    paymentStatus: "completed",
    createdAt: "2026-08-03T11:00:00.000Z",
    updatedAt: "2026-08-04T15:00:00.000Z",
    reason: "Medical withdrawal submitted 48h before workshop start.",
  },
];

const AdminRefundManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("professional");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const limit = 10;

  const [showViewRefundModal, setShowViewRefundModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<
    IRefundManagement | IWorkshopRefund | null
  >(null);

  // Local state for UI preview (allows testing refund actions while API is commented out)
  const [profRefunds, setProfRefunds] = useState<IRefundManagement[]>(
    []
  );
  const [gearRefunds, setGearRefunds] = useState<IRefundManagement[]>(
    INITIAL_GEAR_REFUNDS
  );
  const [workshopRefunds, setWorkshopRefunds] = useState<IWorkshopRefund[]>(
    INITIAL_WORKSHOP_REFUNDS
  );

  // ===========================================================================
  // API INTEGRATION (COMMENTED OUT AS REQUESTED)
  //
  // For Photography & Videography tab:
  // API Endpoint: /event-order?status=cancelled&paymentStatus=Unpaid|Paid
  //
  // Uncomment the lines below to activate live API data fetching:
  // ===========================================================================
  const [everOrderMakeRefund] = useEverOrderMakeRefundMutation();
  // const [gearOrderMakeRefund] = useGearOrderMakeRefundMutation();
  // const [workshopOrderMakeRefund] = useWorkshopOrderMakeRefundMutation();

  // 1. Live Query for Photography & Videography (/event-order?status=cancelled)
  const {
    data: eventOrdersData,
    isFetching: isEventOrdersFetching,
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

  const eventOrdersList: IRefundManagement[] = eventOrdersData?.data || [];
  const eventOrdersTotal: number = eventOrdersData?.meta?.total || 0;

  /*
  // 2. Query for Gear and Workshop tabs (/users/refund-orders) - keep commented until backend ready
  const {
    data: generalRefundData,
    isFetching: isGeneralRefundFetching,
  } = useGetRefundManagementQuery(
    {
      page,
      limit,
      searchTerm: searchText,
      type: activeTab,
      paymentStatus: paymentFilter,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab === "professional",
      pollingInterval: 600000,
    }
  );
  */
  // ===========================================================================

  // Interactive mock data filtering for immediate preview and testing
  const filteredData = useMemo(() => {
    const searchLower = searchText.toLowerCase().trim();

    if (activeTab === "professional") {
      return profRefunds.filter((item) => {
        const matchesSearch =
          !searchLower ||
          item.orderId?.toLowerCase().includes(searchLower) ||
          item.title?.toLowerCase().includes(searchLower) ||
          item.userId?.name?.toLowerCase().includes(searchLower) ||
          item.serviceProviderId?.name?.toLowerCase().includes(searchLower);

        const isPaid = item.paymentStatus?.toLowerCase() === "paid";

        const matchesFilter =
          !paymentFilter ||
          (paymentFilter.toLowerCase() === "paid" && isPaid) ||
          (paymentFilter.toLowerCase() === "unpaid" && !isPaid);

        return matchesSearch && matchesFilter;
      });
    }

    if (activeTab === "gear") {
      return gearRefunds.filter((item) => {
        const matchesSearch =
          !searchLower ||
          item.orderId?.toLowerCase().includes(searchLower) ||
          item.clientId?.name?.toLowerCase().includes(searchLower) ||
          item.sellerId?.name?.toLowerCase().includes(searchLower) ||
          item.gearMarketplaceId?.name?.toLowerCase().includes(searchLower);

        const isPaid = item.paymentStatus?.toLowerCase() === "paid";

        const matchesFilter =
          !paymentFilter ||
          (paymentFilter.toLowerCase() === "paid" && isPaid) ||
          (paymentFilter.toLowerCase() === "unpaid" && !isPaid);

        return matchesSearch && matchesFilter;
      });
    }

    // workshop
    return workshopRefunds.filter((item) => {
      const matchesSearch =
        !searchLower ||
        item.orderId?.toLowerCase().includes(searchLower) ||
        item.clientId?.name?.toLowerCase().includes(searchLower) ||
        item.instructorId?.name?.toLowerCase().includes(searchLower) ||
        item.workshopId?.title?.toLowerCase().includes(searchLower);

      const isPaid =
        item.refundStatus === "refunded" ||
        item.refundPayment?.status === "received" ||
        item.refundPayment?.status === "refunded";

      const matchesFilter =
        !paymentFilter ||
        (paymentFilter.toLowerCase() === "paid" && isPaid) ||
        (paymentFilter.toLowerCase() === "unpaid" && !isPaid);

      return matchesSearch && matchesFilter;
    });
  }, [activeTab, profRefunds, gearRefunds, workshopRefunds, searchText, paymentFilter]);

  const total = filteredData.length;
  const isFetching = false;

  const showRefundModal = (record: IRefundManagement | IWorkshopRefund) => {
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

  const handleRefund = async () => {
    if (!currentRecord) return;

    if (activeTab === "professional") {
      const res = await tryCatchWrapper(
        everOrderMakeRefund,
        { params: currentRecord._id },
        "Processing refund..."
      );
      if (res?.success) {
        handleCancel();
        return;
      }
    }

    // Local state fallback update for instant UI feedback / non-active tabs:
    if (activeTab === "professional") {
      setProfRefunds((prev) =>
        prev.map((item) =>
          item._id === currentRecord._id
            ? {
              ...item,
              paymentStatus: "Paid",
              refundStatus: "refunded",
            }
            : item
        )
      );
    } else if (activeTab === "gear") {
      setGearRefunds((prev) =>
        prev.map((item) =>
          item._id === currentRecord._id
            ? {
              ...item,
              paymentStatus: "Paid",
              refundStatus: "refunded",
            }
            : item
        )
      );
    } else {
      setWorkshopRefunds((prev) =>
        prev.map((item) =>
          item._id === currentRecord._id
            ? {
              ...item,
              refundStatus: "refunded",
              refundPayment: {
                status: "received",
                amount: item.refundAmount || item.workshopId?.price || 0,
                refundedAt: new Date().toISOString(),
              },
            }
            : item
        )
      );
    }

    handleCancel();
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
        options={[
          { label: "All", value: "" },
          { label: "Unpaid", value: "Unpaid" },
          { label: "Paid", value: "Paid" },
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
              <AdminAllRefundManagementTable
                data={
                  eventOrdersData?.data
                    ? (eventOrdersList as IRefundManagement[])
                    : (filteredData as IRefundManagement[])
                }
                loading={isEventOrdersFetching}
                showViewRefundModal={showRefundModal}
                setPage={setPage}
                page={page}
                total={eventOrdersData ? eventOrdersTotal : total}
                limit={limit}
              />
            ),
          },
          {
            label: "Gear",
            value: "gear",
            content: (
              <AdminGearRefundTable
                data={filteredData as IRefundManagement[]}
                loading={isFetching}
                showViewRefundModal={showRefundModal}
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
              <AdminWorkshopRefundTable
                data={filteredData as IWorkshopRefund[]}
                loading={isFetching}
                showViewRefundModal={showRefundModal}
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

      <RefundManagementMakeRefundModal
        isModalVisible={showViewRefundModal}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleRefund={handleRefund}
        description={
          activeTab === "workshop"
            ? "Are you sure you want to refund this workshop participant?"
            : "Are you sure you want to process this refund?"
        }
      />
    </div>
  );
};

export default AdminRefundManagement;
