import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import forgetPasswordIcon from "../../assets/forget-password-icon.png";
import forgetPassword from "../../assets/forget-password-image.png";
import logo from "../../assets/logo.png";

// ✅ Schema
const forgotSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const NewPassword = () => {
  const Navigate = useNavigate();

  // ✅ Separate states (better UX)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("New password:", data.password);
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
        <div className="flex items-center justify-between px-8 ">
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-1.5">
              <img src={logo} alt="logo" />
            </div>
          </div>

          <p className="text-sm ">
            <span className="text-[14px] font-semibold ">
              Already have an account?
            </span>
            <a
              onClick={() => Navigate("/login")}
              className="text-gray-500 font-semibold hover:underline underline-offset-2 ml-2 underline cursor-pointer"
            >
              Log in
            </a>
          </p>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Icon */}
            <div className="flex justify-center items-center mb-4">
              <img src={forgetPasswordIcon} alt="" />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-[32px] font-bold text-[#1e3a6e] mb-3 tracking-tight leading-tight">
                Create new password
              </h1>

              <p className="text-gray-500 text-[14px] font-semibold mb-2">
                Your new password must be unique from those previously used
              </p>
              <hr className="w-[70%] mx-auto border-[#D1D5DB]" />
            </div>

            {/* Success */}
            {isSubmitSuccessful ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="rounded-2xl bg-white border border-[#1e3a6e]/20 p-6 text-center space-y-2 shadow-lg w-[90%] max-w-sm">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#1e3a6e]/10 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1e3a6e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  <p className="font-bold text-[#1e3a6e] text-lg">
                    Password updated!
                  </p>

                  <p className="text-gray-500 text-sm">
                    Your password has been successfully reset.
                  </p>

                  <button
                    onClick={() => Navigate("/login")}
                    className="mt-4 w-full py-2 rounded-lg bg-[#1e3a6e] hover:bg-[#162e5a] active:bg-[#0f2040] text-white text-sm font-semibold transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Password */}
                <div>
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <CiLock size={20} />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.password
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-200 focus:ring-[#1e3a6e]"
                      }`}
                    />

                    {/* 👁 Eye */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <IoEyeOutline size={20} />
                      ) : (
                        <IoEyeOffOutline size={20} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[14px] font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <CiLock size={20} />
                    </span>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                      className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.confirmPassword
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-200 focus:ring-[#1e3a6e]"
                      }`}
                    />

                    {/* 👁 Eye */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <IoEyeOutline size={20} />
                      ) : (
                        <IoEyeOffOutline size={20} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-4 bg-[#1e3a6e] hover:bg-[#162e5a] active:bg-[#0f2040] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  {isSubmitting ? "loading..." : "Continue"}
                </button>
              </form>
            )}
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

export default NewPassword;
