"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import {
  useForgetOtpVerifyMutation,
  useResendForgetOTPMutation,
} from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const forgottenEmail = JSON.parse(
    Cookies.get("frafoldashboard_forgetEmail") || "null"
  );

  const [otpMatch] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 4) {
      const res = await tryCatchWrapper(
        otpMatch,
        { body: { otp: otp } },
        "Verifying..."
      );
      if (res?.statusCode === 200) {
        Cookies.remove("frafoldashboard_forgetToken");
        Cookies.remove("frafoldashboard_forgetEmail");
        Cookies.set(
          "frafoldashboard_forgetOtpMatchToken",
          res.data.forgetOtpMatchToken,
          {
            path: "/",
            expires: 1,
          }
        );

        setOtp("");
        router("/update-password");
      }
    }
  };

  const handleResendOtp = async () => {
    await tryCatchWrapper(
      resendOtp,
      {
        body: {
          purpose: "forget-password", // "reset-password" | "forget-password"
        },
      },
      "Sending OTP..."
    );
  };

  console.log(forgottenEmail);

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto bg-highlight-color p-6 rounded-2xl">
            <div className="mb-8">
              <MdVerifiedUser className="size-10 mb-4 text-base-color mx-auto" />
              <h1 className="text-2xl sm:text-3xl font-semibold text-base-color mb-5">
                Verify Your Email
              </h1>
              <p className="text-lg sm:text-xl mb-2 text-base-color">
                Enter the OTP sent on{" "}
                <span className="text-secondary-color">{forgottenEmail}</span>
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[30px] h-[405px] md:!w-[60px] md:!h-[50px] text-[20px] sm:text-[30px] !bg-primary-color border !border-base-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                onClick={handleOTPSubmit}
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p
                onClick={handleResendOtp}
                className="!text-secondary-color !underline font-semibold cursor-pointer"
              >
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
