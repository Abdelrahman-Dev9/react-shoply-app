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

          body: {
            resetCode,
          },

          headers: {
            Authorization: token || "",
          },
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

          body: {
            newPassword,
            passwordConfirm,
          },

          headers: {
            Authorization: token || "",
          },
        };
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
      }),
    }),

    createCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),

    getAdmins: builder.query({
      query: () => ({
        url: "/admin/getAdmins",
        method: "GET",
      }),

      providesTags: ["Admins"],
    }),

    getAdminById: builder.query({
      query: (id: string) => ({
        url: `/admin/getAdmin/${id}`,
        method: "GET",
      }),

      providesTags: ["Admins"],
    }),

    addAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/addAdmin",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Admins"],
    }),

    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/admin/deleteAdmin/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Admins"],
    }),

    editAdmin: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/admin/editAdmin/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Admins"],
    }),

    addUser: builder.mutation({
      query: (formData) => ({
        url: "/admin/user",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Users"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
      }),

      providesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/user/${id}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Users"],
    }),

    getProducts: builder.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
      }),

      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
  useGetUsersQuery,
  useEditUserMutation,
  useAddUserMutation,
  useGetProductsQuery,
  useAddProductMutation,
} = authApi;
