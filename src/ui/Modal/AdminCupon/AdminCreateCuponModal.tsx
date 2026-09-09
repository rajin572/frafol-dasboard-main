/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import { useAddCouponMutation } from "../../../redux/features/coupon/couponApi";
interface AdminCreateCuponModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AdminCreateCuponModal: React.FC<AdminCreateCuponModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const [addCoupon] = useAddCouponMutation();

  const onSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      amount: Number(values.amount),
      limit: Number(values.limit),
      minimumSpend: Number(values.minimumSpend),
      expiryDate: values.expiryDate ? values.expiryDate.format() : null,
    };

    console.log(formattedValues);

    const res = await tryCatchWrapper(
      addCoupon,
      { body: formattedValues },
      "Adding Coupon..."
    );

    if (res?.statusCode === 201) {
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
          Create Coupon
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="code"
            label="Coupon Code"
            placeholder="E.g. SAVE10"
            rules={[{ required: true, message: "Coupon code is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="amount"
            label="Discount Amount (€)"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Discount amount is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="limit"
            label="Usage Limit"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Usage limit is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="minimumSpend"
            label="Minimum Spend (€)"
            placeholder="0"
            type="number"
            rules={[{ required: true, message: "Minimum spend is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseDatePicker
            name="expiryDate"
            label="Expiry Date (Optional)"
            placeholder="Select date"
          />

          <div className="flex justify-between gap-3 mt-6">
            <ReuseButton htmlType="submit" variant="secondary">
              Create Coupon
            </ReuseButton>

            <ReuseButton variant="outline" onClick={handleCancel}>
              Cancel
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminCreateCuponModal;
