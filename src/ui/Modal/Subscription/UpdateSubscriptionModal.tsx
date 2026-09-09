/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateSubscriptionMutation } from "../../../redux/features/frafolSubscription/susbcriptionApi";
import { useEffect } from "react";
interface UpdateSubscriptionModalProps {
  isAddModalVisible: boolean;
  currentRecord: any;
  handleCancel: () => void;
}

const UpdateSubscriptionModal: React.FC<UpdateSubscriptionModalProps> = ({
  isAddModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  // Set form fields when currentRecord is available
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        price: currentRecord.price,
      });
    }
  }, [currentRecord, form]);

  const [updateSubscription] = useUpdateSubscriptionMutation();

  const onSubmit = async (values: any) => {
    const formattedValues = {
      price: Number(values.price),
    };

    const res = await tryCatchWrapper(
      updateSubscription,
      { body: formattedValues, params: currentRecord?.id },
      "Updating Subscription..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Update {currentRecord?.period} Month Pack
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="price"
            label="Amount (€)"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Amount is required" }]}
            labelClassName="!font-semibold"
          />

          <div className="flex justify-between gap-3 mt-6">
            <ReuseButton htmlType="submit" variant="secondary">
              Update
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default UpdateSubscriptionModal;
