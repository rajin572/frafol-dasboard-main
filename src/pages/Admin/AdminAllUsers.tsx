import { useState } from "react";
import AllUserTable from "../../ui/Tables/UserTable";
import UserModal from "../../ui/Modal/User/UserModal";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import UserProfessionalTable from "../../ui/Tables/UserProfessionalTable";
import UserViewPortfolioModal from "../../ui/Modal/User/UserViewPortfolioModal";
import AdminUsersManagementOverview from "../../Components/Dashboard/AdminUsers/AdminUsersManagementOverview";
import DeleteAccountRequestTable from "../../ui/Tables/DeleteAccountRequestTable";
import DeleteAccountRequestDetailModal from "../../ui/Modal/User/DeleteAccountRequestDetailModal";
import DeleteAccountRejectModal from "../../ui/Modal/User/DeleteAccountRejectModal";
import {
  useBlockAndUnblockUserMutation,
  useGetAllUsersQuery,
  useGetDeleteAccountRequestsQuery,
  useApproveDeleteAccountRequestMutation,
  useRejectDeleteAccountRequestMutation,
} from "../../redux/features/users/usersApi";
import { IUser, IDeleteAccountRequest } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

type TabType = "professional" | "user" | "deleteRequest";

const AdminAllUsers = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [activeTab, setActiveTab] = useState<TabType>("professional");

  const { data, isFetching } = useGetAllUsersQuery(
    {
      limit,
      page,
      searchTerm: searchText,
      type: activeTab,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 600000,
      skip: activeTab === "deleteRequest",
    }
  );

  const { data: deleteReqData, isFetching: deleteReqFetching } =
    useGetDeleteAccountRequestsQuery(
      { page, limit, searchTerm: searchText },
      {
        refetchOnMountOrArgChange: true,
        skip: activeTab !== "deleteRequest",
      }
    );

  const userData = data?.data;
  const total = data?.meta?.total || 0;

  const deleteRequests: IDeleteAccountRequest[] =
    deleteReqData?.data || [];
  const deleteReqTotal = deleteReqData?.meta?.total || 0;

  const [blockAndUnblock] = useBlockAndUnblockUserMutation();
  const [approveDeleteReq] = useApproveDeleteAccountRequestMutation();
  const [rejectDeleteReq] = useRejectDeleteAccountRequestMutation();

  // User modals
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isViewProtfolioModalVisible, setIsViewProtfolioModalVisible] =
    useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IUser | null>(null);

  // Delete request modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [currentDeleteReq, setCurrentDeleteReq] =
    useState<IDeleteAccountRequest | null>(null);

  const showViewUserModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showViewPortfolioModal = () => {
    setIsViewProtfolioModalVisible(true);
  };

  const showBlockModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const showUnblockModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewProtfolioModalVisible(false);
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: IUser) => {
    const res = await tryCatchWrapper(
      blockAndUnblock,
      { params: record?._id },
      "Blocking..."
    );
    if (res?.statusCode === 200) handleCancel();
  };

  const handleUnblock = async (record: IUser) => {
    const res = await tryCatchWrapper(
      blockAndUnblock,
      { params: record?._id },
      "Unblocking..."
    );
    if (res?.statusCode === 200) handleCancel();
  };

  const handleViewDeleteReq = (record: IDeleteAccountRequest) => {
    setCurrentDeleteReq(record);
    setIsDetailModalOpen(true);
  };

  const handleApproveDeleteReq = async (record: IDeleteAccountRequest) => {
    await tryCatchWrapper(
      approveDeleteReq,
      { params: record._id },
      "Approving..."
    );
  };

  const handleOpenRejectModal = (record: IDeleteAccountRequest) => {
    setCurrentDeleteReq(record);
    setIsRejectModalOpen(true);
  };

  const handleRejectDeleteReq = async (reason: string) => {
    if (!currentDeleteReq) return;
    const res = await tryCatchWrapper(
      rejectDeleteReq,
      { params: currentDeleteReq._id, body: { reason } },
      "Rejecting..."
    );
    if (res) {
      setIsRejectModalOpen(false);
      setCurrentDeleteReq(null);
    }
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold mb-5">
          Users Management
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <AdminUsersManagementOverview />
      </div>

      <ReusableTabs<TabType>
        align="left"
        tabs={[
          {
            label: "Professionals",
            value: "professional",
            content: (
              <UserProfessionalTable
                data={userData}
                loading={isFetching}
                showViewModal={showViewUserModal}
                showBlockModal={showBlockModal}
                showUnblockModal={showUnblockModal}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },
          {
            label: "Clients",
            value: "user",
            content: (
              <AllUserTable
                data={userData}
                loading={isFetching}
                showViewModal={showViewUserModal}
                showBlockModal={showBlockModal}
                showUnblockModal={showUnblockModal}
                setPage={setPage}
                page={page}
                total={total}
                limit={limit}
              />
            ),
          },
          {
            label: "Delete Account Requests",
            value: "deleteRequest",
            content: (
              <DeleteAccountRequestTable
                data={deleteRequests}
                loading={deleteReqFetching}
                setPage={setPage}
                page={page}
                total={deleteReqTotal}
                limit={limit}
                onView={handleViewDeleteReq}
                onApprove={handleApproveDeleteReq}
                onReject={handleOpenRejectModal}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      {/* User modals */}
      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        activeTab={activeTab}
        showViewPortfolioModal={showViewPortfolioModal}
      />
      <UserViewPortfolioModal
        isViewProtfolioModalVisible={isViewProtfolioModalVisible}
        handleCancel={() => setIsViewProtfolioModalVisible(false)}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This User ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This User ?"
      />

      {/* Delete account request modals */}
      <DeleteAccountRequestDetailModal
        open={isDetailModalOpen}
        onCancel={() => {
          setIsDetailModalOpen(false);
          setCurrentDeleteReq(null);
        }}
        record={currentDeleteReq}
      />
      <DeleteAccountRejectModal
        open={isRejectModalOpen}
        onCancel={() => {
          setIsRejectModalOpen(false);
          setCurrentDeleteReq(null);
        }}
        onConfirm={handleRejectDeleteReq}
      />
    </div>
  );
};

export default AdminAllUsers;
