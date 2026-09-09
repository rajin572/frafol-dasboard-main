/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Select } from "antd";
import { useEffect } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useEditAdminMutation } from "../../../redux/features/adminManagement/adminManagementApi";
import { ADMIN_ROUTE_OPTIONS } from "../../../utils/routeOptions";
import { IAdmin } from "../../../types";

interface Props {
  open: boolean;
  onCancel: () => void;
  record: IAdmin | null;
}

const routeOptions = ADMIN_ROUTE_OPTIONS;

const EditAdminModal: React.FC<Props> = ({ open, onCancel, record }) => {
  const [form] = Form.useForm();
  const [editAdmin] = useEditAdminMutation();

  const selectedRoutes: string[] = Form.useWatch("allowedRoutes", form) ?? [];

  console.log(record)

  useEffect(() => {
    if (record && open) {
      form.setFieldsValue({
        name: record.name,
        email: record.email,
        phone: record.phone ?? "",
        address: record.address ?? "",
        allowedRoutes: record.allowedRoutes ?? [],
      });
    }
  }, [record, open, form]);

  const handleRoutesChange = (values: string[]) => {
    if (values.includes("all")) {
      form.setFieldValue("allowedRoutes", ["all"]);
    } else {
      form.setFieldValue("allowedRoutes", values);
    }
  };

  const onSubmit = async (values: any) => {
    if (!record) return;

    const payload: any = {
      name: values.name,
      email: values.email,
      allowedRoutes: values.allowedRoutes ?? [],
    };
    if (values.password) payload.password = values.password;
    if (values.phone) payload.phone = values.phone;
    if (values.address) payload.address = values.address;

    const res = await tryCatchWrapper(
      editAdmin,
      { params: record._id, body: payload },
      "Updating admin..."
    );

    if (res?.statusCode === 200) {
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
          Edit Admin
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
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
              label="New Password"
              placeholder="Leave blank to keep current"
              inputType="password"
              rules={[{ min: 6, message: "Minimum 6 characters" }]}
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
            Save Changes
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditAdminModal;
