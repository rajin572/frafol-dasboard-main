/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseDatePicker from "../../Form/ReuseDatePicker"; // Custom date picker component
import dayjs from "dayjs"; // Import Day.js
import { useEffect } from "react";
import { useUpdateCouponMutation } from "../../../redux/features/coupon/couponApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AdminUpdateCuponModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord?: any; // Optional, if you want to pre-fill the form with existing data
}

const AdminUpdateCuponModal: React.FC<AdminUpdateCuponModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [updateCoupon] = useUpdateCouponMutation();

  // Set form fields when currentRecord is available
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        code: currentRecord.code,
        amount: currentRecord.amount,
        limit: currentRecord.limit,
        minimumSpend: currentRecord.minimumSpend,
        // Use Day.js to parse and format the date
        expiryDate: currentRecord.expiryDate
          ? dayjs(currentRecord.expiryDate)
          : null,
      });
    }
  }, [currentRecord, form]);

  // Handle form submission
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
      updateCoupon,
      { body: formattedValues, params: { id: currentRecord?._id } },
      "Updating Coupon..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
    console.log(res);
  };

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Edit Coupon
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
            placeholder="Select expiry date"
            value={form.getFieldValue("expiry")}
          />

          <div className="flex justify-between gap-3 mt-6">
            <ReuseButton htmlType="submit" variant="secondary">
              Update Coupon
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

export default AdminUpdateCuponModal;
