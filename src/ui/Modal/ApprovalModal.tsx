/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface ApprovalModalProps<T> {
  isApprovalModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleApprove: (data: T) => void;
  description?: string;
}

const ApprovalModal: React.FC<ApprovalModalProps<any>> = ({
  isApprovalModalVisible,
  handleCancel,
  currentRecord,
  handleApprove,
  description = " Are You Sure You want to Approve ?",
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isApprovalModalVisible}
      onOk={handleApprove}
      onCancel={handleCancel}
      okText="Unblock"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={handleCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-success !border-success"
            onClick={() => handleApprove(currentRecord)}
          >
            Approve
          </ReuseButton>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        {description}
      </p>
    </Modal>
  );
};

export default ApprovalModal;
