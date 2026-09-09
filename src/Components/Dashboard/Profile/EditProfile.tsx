/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";
import ReuseButton from "../../../ui/Button/ReuseButton";
import Loading from "../../../ui/Loading";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { getImageUrl } from "../../../helpers/config/envConfig";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName:
      "!py-2 !w-full disabled:!text-base-color disabled:!border-input-color/60 disabled:!bg-input-color/10",
    rules: [{ required: true, message: "Email is required" }],
    disable: true,
  },
  {
    name: "fullName",
    type: "text",
    inputType: "text",
    label: "Full name",
    placeholder: "Enter your full name",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Full name is required" }],
    disable: false,
  },
];

const EditProfile = () => {
  const [form] = Form.useForm();
  const imageApiUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation({});

  const profileData = data?.data;

  const profileImage = imageApiUrl + profileData?.profileImage;

  const [imageUrl, setImageUrl] = useState(profileImage);

  useEffect(() => {
    setImageUrl(profileImage);
    form.setFieldsValue({
      email: profileData?.email,
      fullName: profileData?.name,
    });
  }, [form, profileData?.email, profileData?.name, profileImage]);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      name: values?.fullName,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" mt-10  rounded-xl">
      <div className=" flex justify-start items-center">
        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="p-10 w-full lg:w-[70%]"
        >
          <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
            <div className=" relative">
              <img
                width={1000}
                height={1000}
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className=" text-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  listType="picture"
                >
                  <button
                    type="button"
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-base-color/70 p-2 w-fit h-fit !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer shadow-lg"
                  >
                    <IoCameraOutline className="w-6 h-6 text-secondary-color" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          {inputStructure?.map((input, index) => (
            <ReuseInput
              key={index}
              name={input.name}
              Typolevel={5}
              inputType={input.inputType}
              type={input.type}
              label={input.label}
              placeholder={input.placeholder}
              labelClassName={input.labelClassName}
              inputClassName={input.inputClassName}
              rules={input.rules}
              disabled={input.disable}
            />
          ))}

          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="w-full mt-4"
          >
            Submit
          </ReuseButton>

          <div className=" text-white mt-5"></div>
        </ReusableForm>
      </div>
    </div>
  );
};
export default EditProfile;
