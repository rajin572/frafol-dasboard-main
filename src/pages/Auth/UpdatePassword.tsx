/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoMdUnlock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { Form } from "antd";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: any) => {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      resetPassword,
      { body: data },
      "Changing Password..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("frafoldashboard_forgetOtpMatchToken");
      router("/sign-in");
    }
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-highlight-color p-6 rounded-2xl">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-5">
                <IoMdUnlock className="size-10 mb-4 text-base-color mx-auto" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-base-color mb-5">
                  Reset Your Password
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                rules={[{ required: true, message: "Password is required" }]}
                inputClassName="!py-2"
              />
              <ReuseInput
                inputType="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Your Password "
                rules={[
                  { required: true, message: "Confirm Password is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                inputClassName="!py-2"
              />

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                // icon={allIcons.arrowRight}
              >
                Change Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
