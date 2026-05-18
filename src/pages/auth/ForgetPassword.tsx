import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import forgetPasswordIcon from "../../assets/forget-password-icon.png";
import logo from "../../assets/logo.png";

import { useForgetPasswordMutation } from "@/redux/services/authApi";
import { useState } from "react";

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    try {
      const res = await forgetPassword(data.email).unwrap();

      // store token for next step
      if (res?.token) {
        localStorage.setItem("reset_token", res.token);
      }

      // store email for verify screen
      localStorage.setItem("reset_email", data.email);

      // console.log("SUCCESS:", res);

      setSuccess(true);
    } catch (err: any) {
      console.log("ERROR:", err);
      alert(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row font-sans bg-gray-100">
      {/* LEFT IMAGE */}
      {/* <img
        src={forgetPassword}
        alt="forget-password"
        className="hidden lg:block w-[50%] p-10"
      /> */}

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col bg-white min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 pt-6">
          <img src={logo} alt="logo" />

          <p className="text-sm">
            <span className="font-semibold">Already have an account?</span>
            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-gray-500 font-semibold cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>

        {/* FORM AREA */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-4">
              <img src={forgetPasswordIcon} />
            </div>

            <h1 className="text-center text-[32px] font-bold text-[#1e3a6e]">
              Forgot your password?
            </h1>

            <p className="text-center text-gray-500 text-sm mt-2">
              We will send a reset code to your email
            </p>

            {/* SUCCESS MODAL */}
            {success ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-white p-6 rounded-2xl w-[90%] max-w-sm text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    ✔
                  </div>

                  <h2 className="font-bold text-lg mt-3 text-[#1e3a6e]">
                    Check your inbox
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Reset code sent successfully
                  </p>

                  <button
                    onClick={() => navigate("/verifyCode")}
                    className="mt-4 w-full bg-[#1e3a6e] text-white py-2 rounded-lg"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label className="text-sm font-semibold">Email</label>

                  <div className="relative mt-2">
                    <CiMail className="absolute left-3 top-3.5 text-gray-400" />

                    <input
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                      className={`w-full pl-10 pr-3 py-3 border rounded-xl ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1e3a6e] text-white rounded-xl font-bold disabled:opacity-60"
                >
                  {isLoading ? "Sending..." : "Continue"}
                </button>

                {/* BACK */}
                <p
                  onClick={() => navigate("/login")}
                  className="text-center text-sm text-gray-500 cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaArrowLeftLong />
                  Back to login
                </p>
              </form>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center pb-6 text-sm text-gray-600">
          Created by Priceo Team
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
