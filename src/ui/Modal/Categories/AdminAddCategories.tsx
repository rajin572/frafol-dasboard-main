/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryApi";
interface AdminAddCategoriesProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  activeTab: "photoGraphy" | "videoGraphy" | "gear";
}

const AdminAddCategories: React.FC<AdminAddCategoriesProps> = ({
  isAddModalVisible,
  handleCancel,
  activeTab,
}) => {
  const [form] = Form.useForm();

  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values?.image?.[0]?.originFileObj);
    }
    const data = {
      title: values?.title,
      subTitle: values?.subTitle,
      type: activeTab,
    };

    formData.append("data", JSON.stringify(data));
    const res = await tryCatchWrapper(
      addCategory,
      { body: formData },
      "Adding Category..."
    );

    console.log(res);

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
          Create New Category
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="title"
            label="Titles"
            placeholder="Enter Titles"
            rules={[{ required: true, message: "Titles is required" }]}
            labelClassName="!font-semibold"
          />
          {activeTab === "photoGraphy" ? (
            <div>
              <ReuseInput
                name="subTitle"
                label="Subtitle"
                placeholder="Enter Subtitle"
                rules={[{ required: true, message: "Subtitle is required" }]}
                labelClassName="!font-semibold"
              />
              <ReuseUpload
                label="Upload Image"
                name="image"
                buttonText="Upload Image"
                accept="image/png, image/jpeg"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </div>
          ) : activeTab === "videoGraphy" ? (
            <div>
              <ReuseInput
                name="subTitle"
                label="Subtitle"
                placeholder="Enter Subtitle"
                rules={[{ required: true, message: "Subtitle is required" }]}
                labelClassName="!font-semibold"
              />
              <ReuseUpload
                label="Upload Image"
                name="image"
                buttonText="Upload Image"
                accept="image/png, image/jpeg"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </div>
          ) : null}

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Add
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AdminAddCategories;
