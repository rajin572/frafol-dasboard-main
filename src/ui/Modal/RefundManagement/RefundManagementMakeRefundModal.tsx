/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";

interface RefundModalProps<T> {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleRefund: (data: T) => void;
  description?: string;
}

const RefundManagementMakeRefundModal = ({
  isModalVisible,
  handleCancel,
  currentRecord,
  handleRefund,
  description = "Are You Sure You want to process this refund?",
}: RefundModalProps<any>) => {
  return (
    <Modal
      open={isModalVisible}
      onOk={() => currentRecord && handleRefund(currentRecord)}
      onCancel={handleCancel}
      centered
      style={{ textAlign: "center" }}
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
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-error !border-error text-white"
            onClick={() => currentRecord && handleRefund(currentRecord)}
          >
            Process Refund
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

export default RefundManagementMakeRefundModal;
