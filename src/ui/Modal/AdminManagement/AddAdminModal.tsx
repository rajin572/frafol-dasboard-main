/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Select } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddAdminMutation } from "../../../redux/features/adminManagement/adminManagementApi";
import { ADMIN_ROUTE_OPTIONS } from "../../../utils/routeOptions";

interface Props {
  open: boolean;
  onCancel: () => void;
}

const AddAdminModal: React.FC<Props> = ({ open, onCancel }) => {
  const routeOptions = ADMIN_ROUTE_OPTIONS;
  const [form] = Form.useForm();
  const [addAdmin] = useAddAdminMutation();

  const selectedRoutes: string[] = Form.useWatch("allowedRoutes", form) ?? [];

  const handleRoutesChange = (values: string[]) => {
    if (values.includes("all")) {
      form.setFieldValue("allowedRoutes", ["all"]);
    } else {
      form.setFieldValue("allowedRoutes", values);
    }
  };

  const onSubmit = async (values: any) => {
    const payload: any = {
      name: values.name,
      email: values.email,
      password: values.password,
      allowedRoutes: values.allowedRoutes ?? [],
    };
    if (values.phone) payload.phone = values.phone;
    if (values.address) payload.address = values.address;

    const res = await tryCatchWrapper(
      addAdmin,
      { body: payload },
      "Adding admin..."
    );

    if (res?.statusCode === 201 || res?.statusCode === 200) {
      form.resetFields();
      onCancel();
    }
  };

  const isAllSelected = selectedRoutes.includes("all");

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      centered
      className="lg:!w-[560px] !w-[90%]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Add New Admin
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <div className="">
            <ReuseInput
              name="name"
              label="Name"
              placeholder="Enter name"
              rules={[{ required: true, message: "Name is required" }]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="email"
              label="Email"
              placeholder="Enter email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="password"
              label="Password"
              placeholder="Enter password"
              inputType="password"
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Minimum 6 characters" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              labelClassName="!font-semibold"
            />
          </div>

          <ReuseInput
            name="address"
            label="Address"
            placeholder="Enter address"
            labelClassName="!font-semibold"
          />

          <div className="mb-4">
            <p className="!font-semibold text-sm mb-1">Accessible Routes</p>
            <Form.Item name="allowedRoutes">
              <Select
                mode="multiple"
                placeholder="Select accessible routes"
                className="!min-h-10 !text-base-color border !border-primary-color !ring-0 rounded-md w-full"
                onChange={handleRoutesChange}
                options={routeOptions.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                  disabled: isAllSelected && opt.value !== "all",
                }))}
                allowClear
              />
            </Form.Item>
          </div>

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Add Admin
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
