/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import { useEffect } from "react";

interface DeclineModalProps<T> {
  isDeclineModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDecline: (data: T, value: any) => void;
  showInput?: boolean;
}

const DeclineModal: React.FC<DeclineModalProps<any>> = ({
  isDeclineModalVisible,
  handleCancel,
  currentRecord,
  handleDecline,
  showInput = true,
}) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (!currentRecord) {
      form.resetFields();
    }
  }, [currentRecord, form]);
  //   const [blockUser] = useBlockUserMutation();

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeclineModalVisible}
      onCancel={onCancel}
      okText="Unblock"
      cancelText="Cancel"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={false}
    >
      <h3 className="!text-2xl my-5 text-center !font-bold !text-secondary-color">
        Are you sure you want to Decline?
      </h3>

      <ReusableForm
        form={form}
        handleFinish={(value: any) => handleDecline(currentRecord, value)}
      >
        {showInput && (
          <ReuseInput
            inputType="textarea"
            name="reason"
            labelClassName="!font-bold !text-base-color"
            label="Reason for Decline"
            placeholder="Enter reason for decline"
            rules={[{ required: true, message: "Please input your reason!" }]}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={onCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-error !border-error"
          >
            Decline
          </ReuseButton>
        </div>
      </ReusableForm>
    </Modal>
  );
};

export default DeclineModal;
