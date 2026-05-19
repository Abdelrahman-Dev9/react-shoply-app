import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (email: string) => ({
        url: "/auth/forgetpass",
        method: "POST",
        body: { email },
      }),
    }),

    verifyCode: builder.mutation({
      query: (resetCode: string) => {
        const token = localStorage.getItem("reset_token");
        return {
          url: "/auth/verifycode",
          method: "POST",
          body: { resetCode },
          headers: { Authorization: token || "" },
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({
        newPassword,
        passwordConfirm,
      }: {
        newPassword: string;
        passwordConfirm: string;
      }) => {
        const token = localStorage.getItem("reset_token");
        return {
          url: "/auth/resetpassword",
          method: "PUT",
          body: { newPassword, passwordConfirm },
          headers: { Authorization: token || "" },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApi;
