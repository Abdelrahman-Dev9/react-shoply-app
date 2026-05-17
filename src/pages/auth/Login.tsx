import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock, CiMail } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import LoginImage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";

import { useLoginMutation } from "@/redux/services/authApi";
import { setAdminId, setAdminToken } from "@/utils/auth";

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

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // ✅ SAVE TOKEN FIRST
      setAdminToken(res.token); // adjust if API uses different key
      setAdminId(res.data._id);

      // ✅ THEN NAVIGATE
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log("Login error:", error);
      alert(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left Image */}
      <img
        src={LoginImage}
        alt="Login"
        className="hidden lg:block w-[50%] object-cover"
      />

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Logo */}
        <div className="px-8 pt-8">
          <img src={logo} alt="logo" />
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <h1 className="text-[32px] font-bold text-[#1e3a6e]">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Log in to manage administrative tasks
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>

                <div className="relative mt-2">
                  <CiMail className="absolute left-3 top-3.5 text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className="w-full pl-10 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a6e]"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative mt-2">
                  <CiLock className="absolute left-3 top-3.5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password")}
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a6e]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <IoEyeOffOutline size={20} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("rememberMe")} />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgetPassword")}
                  className="text-sm text-[#1e3a6e] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1e3a6e] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-6 text-sm text-gray-600">
          Created By Priceo Team
        </div>
      </div>
    </div>
  );
};

export default Login;
