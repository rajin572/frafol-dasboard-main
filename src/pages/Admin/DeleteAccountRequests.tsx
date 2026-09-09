import { useState } from "react";
import { Modal } from "antd";
import DeleteAccountRequestTable from "../../ui/Tables/DeleteAccountRequestTable";
import DeleteAccountRequestDetailModal from "../../ui/Modal/User/DeleteAccountRequestDetailModal";
import DeleteAccountRejectModal from "../../ui/Modal/User/DeleteAccountRejectModal";
import ReuseButton from "../../ui/Button/ReuseButton";
import {
  useGetDeleteAccountRequestsQuery,
  useApproveDeleteAccountRequestMutation,
  useRejectDeleteAccountRequestMutation,
} from "../../redux/features/users/usersApi";
import { IDeleteAccountRequest } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const DeleteAccountRequests = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isFetching } = useGetDeleteAccountRequestsQuery(
    { page, limit, searchTerm: "" },
    { refetchOnMountOrArgChange: true }
  );

  const requests: IDeleteAccountRequest[] = data?.data || [];
  const total = data?.meta?.total || 0;

  const [approveRequest, { isLoading: isApproving }] =
    useApproveDeleteAccountRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectDeleteAccountRequestMutation();

  const [currentRecord, setCurrentRecord] =
    useState<IDeleteAccountRequest | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const handleView = (record: IDeleteAccountRequest) => {
    setCurrentRecord(record);
    setIsViewOpen(true);
  };

  const handleApproveOpen = (record: IDeleteAccountRequest) => {
    setCurrentRecord(record);
    setIsApproveOpen(true);
  };

  const handleRejectOpen = (record: IDeleteAccountRequest) => {
    setCurrentRecord(record);
    setIsRejectOpen(true);
  };

  const handleCancel = () => {
    setIsViewOpen(false);
    setIsApproveOpen(false);
    setIsRejectOpen(false);
    setCurrentRecord(null);
  };

  const handleApprove = async () => {
    if (!currentRecord) return;
    const res = await tryCatchWrapper(
      approveRequest,
      { params: currentRecord._id },
      "Approving request..."
    );
    if (res?.success) handleCancel();
  };

  const handleReject = async (reason: string) => {
    if (!currentRecord) return;
    const res = await tryCatchWrapper(
      rejectRequest,
      { params: currentRecord._id, body: { reason } },
      "Rejecting request..."
    );
    if (res?.success) handleCancel();
  };

  return (
    <div className="bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
          Delete Account Requests
        </p>
      </div>

      <DeleteAccountRequestTable
        data={requests}
        loading={isFetching}
        setPage={setPage}
        page={page}
        total={total}
        limit={limit}
        onView={handleView}
        onApprove={handleApproveOpen}
        onReject={handleRejectOpen}
      />

      {/* View Detail Modal */}
      <DeleteAccountRequestDetailModal
        open={isViewOpen}
        onCancel={handleCancel}
        record={currentRecord}
      />

      {/* Approve Confirmation Modal */}
      <Modal
        open={isApproveOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="!w-[90%] max-w-[480px]"
      >
        <div className="p-4">
          <h3 className="text-xl font-bold text-secondary-color mb-1">
            Approve Delete Request
          </h3>
          <p className="text-sm text-[#989898] mb-5">
            Are you sure you want to approve the account deletion for{" "}
            <span className="font-semibold text-base-color">
              {currentRecord?.name} {currentRecord?.sureName || ""}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <ReuseButton variant="outline" onClick={handleCancel}>
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              onClick={handleApprove}
              disabled={isApproving}
            >
              Approve
            </ReuseButton>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <DeleteAccountRejectModal
        open={isRejectOpen}
        onCancel={handleCancel}
        onConfirm={handleReject}
        loading={isRejecting}
      />
    </div>
  );
};

export default DeleteAccountRequests;
