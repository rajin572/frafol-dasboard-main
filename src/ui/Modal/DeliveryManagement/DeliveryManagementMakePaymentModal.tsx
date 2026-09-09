/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
interface BlockModalProps<T> {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handlePayment: (data: T) => void;
  description?: string;
}

const DeliveryManagementMakePaymentModal = ({
  isModalVisible,
  handleCancel,
  currentRecord,
  handlePayment,
  description = " Are You Sure You want to make payment ?",
}: BlockModalProps<any>) => {
  return (
    <Modal
      // title="Confirm Delete"
      open={isModalVisible}
      onOk={handlePayment}
      onCancel={handleCancel}
      okText="Block"
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
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-success !border-success"
            onClick={() => handlePayment(currentRecord)}
          >
            Make Payment
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

export default DeliveryManagementMakePaymentModal;
