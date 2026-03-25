import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import forgetPassword from "../../assets/forget-password-image.png";
import logo from "../../assets/logo.png";
import forgetPasswordIcon from "../../assets/forget-password-icon.png";
import { CiMail } from "react-icons/ci";

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Reset link sent to:", data.email);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row font-sans bg-gray-100">
      {/* ── Left Panel ── */}
      <img
        src={forgetPassword}
        alt="forget-password-image"
        className="hidden sm:hidden lg:block w-[50%] p-10"
      />
      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Nav */}
        <div className="flex items-center justify-between px-8 ">
          {/* Logo */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-1.5">
              {/* Priceo logo icon */}

              <img src={logo} alt="logo" />
            </div>
          </div>
          {/* Already have account */}
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
            {/* Icon badge */}
            <div className="flex justify-center items-center mb-4">
              <img src={forgetPasswordIcon} alt="" />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-[32px]  font-bold text-[#1e3a6e] mb-3 tracking-tight leading-tight">
                Forgot your password?
              </h1>

              <p className="text-gray-500 text-[14px] font-semibold mb-2">
                A code will be sent to your email to reset password
              </p>
              <hr className="w-70 mx-auto border-[#D1D5DB]" />
            </div>

            {/* Success state */}
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
                    Check your inbox!
                  </p>

                  <p className="text-gray-500 text-sm">
                    We've sent a password reset code to your email address.
                  </p>

                  <button
                    onClick={() => Navigate("/verifyCode")}
                    className="mt-4 w-full py-2 rounded-lg bg-[#1e3a6e] hover:bg-[#162e5a] active:bg-[#0f2040] text-white text-sm font-semibold transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Email field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <CiMail size={20} />
                    </span>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm ${
                        errors.email
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-200 focus:ring-[#1e3a6e]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-4 bg-[#1e3a6e] hover:bg-[#162e5a] active:bg-[#0f2040] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <>loading...</> : "Continue"}
                </button>

                {/* Back to login */}
                <div className="text-center pt-1">
                  <a
                    href="#"
                    onClick={() => Navigate("/login")}
                    className="text-sm text-gray-500 hover:text-[#1e3a6e] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FaArrowLeftLong className="mt-1" />
                    Back to login
                  </a>
                </div>
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
export default ForgotPassword;
