/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { MdOutlineEuro, MdOutlinePercent } from "react-icons/md";
import {
  useGetCommissionSetupQuery,
  useUpdateCommissionSetupMutation,
} from "../../redux/features/commissionSetup/commissionSetupApi";
import Loading from "../../ui/Loading";
import React from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const inputStructure = [
  {
    name: "photoVideoGrapy",
    label: "Set Commission Rate For Photography/Videography Orders",
    inputType: "number",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: "Commission percentage is required" }],
    prefix: <MdOutlinePercent className="text-secondary-color" />,
  },
  {
    name: "minimumCharge",
    label: "Set Minimum Commission Amount For Photography/Videography Orders",
    inputType: "number",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: "Commission percentage is required" }],
    prefix: <MdOutlineEuro className="text-secondary-color" />,
  },
  {
    name: "gearOrders",
    label: "Set Commission  Rate For Gear Orders",
    inputType: "number",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: "Commission percentage is required" }],
    prefix: <MdOutlinePercent className="text-secondary-color" />,
  },
  {
    name: "workShop",
    label: "Set Commission  Rate For Workshop",
    inputType: "number",
    placeholder: "Enter your commission percentage",
    labelClassName: "!font-medium",
    rules: [{ required: true, message: " Commission percentage is required" }],
    prefix: <MdOutlinePercent className="text-secondary-color" />,
  },
];

const AdminCommissionSetupPage = () => {
  const [form] = Form.useForm();

  const { data, isFetching } = useGetCommissionSetupQuery({});
  const [updateCommissionSetup] = useUpdateCommissionSetupMutation();

  const commissionSetupData = data?.data;

  React.useEffect(() => {
    if (commissionSetupData) {
      form.setFieldsValue(commissionSetupData);
    }
  }, [commissionSetupData, form]);

  const handleFinish = (values: any) => {
    tryCatchWrapper(
      updateCommissionSetup,
      { body: values },
      "Updating Commission Setup..."
    );
  };

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5 ">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Commission Setup
        </p>
      </div>
      <ReusableForm form={form} handleFinish={handleFinish}>
        {inputStructure.map((input, index) => (
          <ReuseInput
            type="number"
            key={index}
            name={input.name}
            label={input.label}
            inputType={input.inputType}
            placeholder={input.placeholder}
            labelClassName={input.labelClassName}
            rules={input.rules}
            prefix={input.prefix}
          />
        ))}
        <ReuseButton
          variant="secondary"
          className="!px-5 !py-4 !w-fit mt-5"
          htmlType="submit"
        >
          Save
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default AdminCommissionSetupPage;
