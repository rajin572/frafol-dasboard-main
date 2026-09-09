/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Typography } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useEffect } from "react";
import { getImageUrl } from "../../../helpers/config/envConfig";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
interface AdminEditCategoriesProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  activeTab: "photoGraphy" | "videoGraphy" | "gear";
  currentRecord?: any; // Optional, if you want to pre-fill the form with existing data
}

const AdminEditCategories: React.FC<AdminEditCategoriesProps> = ({
  isEditModalVisible,
  handleCancel,
  activeTab,
  currentRecord,
}) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const [form] = Form.useForm();
  const serverUrl = getImageUrl();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        title: currentRecord.title,
        subTitle: currentRecord.subTitle,
      });
    }
  }, [currentRecord, form]);

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
      updateCategory,
      { body: formData, params: { id: currentRecord?._id } },
      "Updating Category..."
    );

    console.log(res);

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
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
          {activeTab === "photoGraphy" || activeTab === "videoGraphy" ? (
            <div>
              <ReuseInput
                name="subTitle"
                label="Subtitle"
                placeholder="Enter Subtitle"
                rules={[{ required: true, message: "Subtitle is required" }]}
                labelClassName="!font-semibold"
              />

              <div className="my-5">
                <Typography.Title level={5}>Current Image: </Typography.Title>
                <img
                  src={
                    currentRecord?.image ? serverUrl + currentRecord?.image : ""
                  }
                  alt=""
                  className="w-auto h-20 object-cover"
                />
              </div>
              <ReuseUpload
                label="Change Image"
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

export default AdminEditCategories;
