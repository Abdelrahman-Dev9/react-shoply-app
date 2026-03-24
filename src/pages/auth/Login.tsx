import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock, CiMail } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import LoginImage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Logged in as: ${data.email}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Panel */}

      {/* Left Panel */}
      <img
        src={LoginImage}
        alt="Login"
        className="hidden sm:hidden lg:block w-[50%]"
      />

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Logo */}
        <div className="px-8 pt-8 pb-2">
          <div className="flex items-center gap-1.5">
            {/* Priceo logo icon */}

            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 mt-[-140px]">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className=" ml-18 mb-18">
              <h1 className="text-[32px]  text-[#1e3a6e] mb-2 tracking-tight ml-7 font-bold">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-[14px] font-semibold">
                Log in to Manage Administrative Tasks
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block text-[14px] font-semibold text-gray-700 mb-2">
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
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
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

              {/* Password */}
              <div>
                <label className="block text-[14px]  font-semibold text-gray-700 mb-2">
                  Password
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <IoEyeOffOutline size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="w-4 h-4 rounded border-gray-300 text-[#1e3a6e] accent-[#1e3a6e] cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    remember me
                  </span>
                </label>
                <a
                  onClick={() => navigate("/forgetPassword")}
                  className="text-sm font-semibold text-[#1e3a6e] hover:underline underline-offset-2 transition-all"
                >
                  Forgot password ?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1e3a6e] hover:bg-[#162e5a] active:bg-[#0f2040] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-[16px] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ? <>loading...</> : "Log in"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 px-4 ">
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
export default Login;
