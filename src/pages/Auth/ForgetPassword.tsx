/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbLockFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { Form } from "antd";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const userExist = useUserData();
  const [forgetPassword] = useForgetPasswordMutation();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      { body: values },
      "Sending OTP..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.set("frafoldashboard_forgetToken", res.data.forgetToken, {
        path: "/",
        expires: 1,
      });
      Cookies.set("frafoldashboard_forgetEmail", JSON.stringify(values.email), {
        path: "/",
        expires: 1,
      });
      router("/forgot-password/otp-verify");
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-highlight-color p-6 rounded-2xl">
            <div className="mb-8">
              <TbLockFilled className="size-10 mb-4 text-base-color mx-auto" />
              <h1 className="text-2xl sm:text-3xl font-semibold text-base-color mb-5 text-center">
                Forgot Password
              </h1>
              <p className=" sm:text-lg mb-2 text-base-color text-center">
                Provide your account&apos;s phone number for which you want to
                reset your password
              </p>
            </div>

            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!py-2"
              />
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                // icon={allIcons.arrowRight}
              >
                Forgot
              </ReuseButton>
            </ReusableForm>

            <div className="text-base-color w-fit mx-auto mt-10">
              <Link
                to="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
