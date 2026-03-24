import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import OTPInput from "react-otp-input";
import forgetPassword from "../../assets/forget-password-image.png";
import logo from "../../assets/logo.png";
import verifyCodeIcon from "../../assets/verify-code-icon.png";

// Zod schema for OTP verification
const verifyCodeSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

const VerifyCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (data: VerifyCodeFormValues) => {
    console.log("OTP entered:", data.otp);
    // TODO: Call your verify OTP API here

    // Navigate only after successful verification
    navigate("/newPassword");
  };

  // Sync OTPInput with React Hook Form
  const handleOtpChange = (value: string) => {
    setOtp(value);
    setValue("otp", value);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row font-sans bg-gray-100">
      {/* Left Panel */}
      <img
        src={forgetPassword}
        alt="forget-password-image"
        className="hidden lg:block w-[50%] p-10"
      />

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Nav */}
        <div className="flex items-center justify-between px-8">
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-1.5">
              <img src={logo} alt="logo" />
            </div>
          </div>

          <p className="text-sm">
            <span className="text-[14px] font-semibold">
              Already have an account?
            </span>
            <a
              onClick={() => navigate("/login")}
              className="text-gray-500 font-semibold hover:underline underline-offset-2 ml-2 cursor-pointer"
            >
              Log in
            </a>
          </p>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Icon badge */}
            <div className="flex justify-center items-center mb-4">
              <img src={verifyCodeIcon} alt="verify-code-icon" />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-[32px] font-bold text-[#1e3a6e] mb-3 tracking-tight leading-tight">
                Check your email
              </h1>
              <p className="text-gray-500 text-[14px] font-semibold mb-2">
                Enter the code that was sent to your email
              </p>
              <hr className="w-[70%] mx-auto border-[#D1D5DB]" />
            </div>

            {/* OTP Input */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-4"
            >
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                renderSeparator={<span className="mx-2" />}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    maxLength={1}
                    className={`w-24 h-12 border-2 rounded-lg text-center text-2xl focus:outline-none ${
                      errors.otp
                        ? "border-red-500"
                        : "border-[#273651] focus:border-[#1e3a6e]"
                    }`}
                  />
                )}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}

              <button
                type="submit"
                className="mt-4 bg-[#1e3a6e] text-white px-6 py-2 rounded-lg transition w-[78%] cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 px-4">
          <p className="text-sm font-bold text-gray-700">
            Created By Priceo Team
          </p>
          <a
            href="#"
            className="text-sm text-[#1e3a6e] hover:underline underline-offset-2 font-medium"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
