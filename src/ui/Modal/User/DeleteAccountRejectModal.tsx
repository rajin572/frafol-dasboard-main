import { useState } from "react";
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  loading?: boolean;
}

const DeleteAccountRejectModal: React.FC<Props> = ({
  open,
  onCancel,
  onConfirm,
  loading,
}) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
  };

  const handleCancel = () => {
    setReason("");
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      className="!w-[90%] !max-w-[500px]"
    >
      <div className="p-4">
        <h3 className="text-xl font-bold text-secondary-color mb-1">
          Reject Delete Account Request
        </h3>
        <p className="text-sm text-[#989898] mb-5">
          Please provide a reason for rejecting this request.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:border-secondary-color"
          rows={4}
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <ReuseButton variant="outline" onClick={handleCancel}>
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="error"
            onClick={handleConfirm}
            disabled={!reason.trim() || loading}
          >
            Reject
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountRejectModal;
