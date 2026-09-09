/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();

  const [login] = useLoginMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin" || userExist?.role === "super-admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, "Logging In...");
    console.log(res?.data?.user?.role);
    if (res?.statusCode === 200 && (res?.data?.user?.role === "admin" || res?.data?.user?.role === "super-admin")) {
      Cookies.set("frafoldashboard_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      Cookies.set("frafoldashboard_refreshToken", res?.data?.refreshToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/", { replace: true });
    } else if (res?.statusCode === 200 && res?.data?.user?.role !== "admin") {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-highlight-color p-6 rounded-2xl">
            <img
              src={AllImages?.logo}
              alt="logo"
              className="w-auto mx-auto mb-6"
            />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-secondary-color">
                  Sign in Your Account
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!py-2"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              />
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                inputClassName="!py-2"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
              />
              <div className="flex justify-between items-center mt-10 mb-5">
                <Checkbox className="!text-base-color">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!text-base-color !underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
