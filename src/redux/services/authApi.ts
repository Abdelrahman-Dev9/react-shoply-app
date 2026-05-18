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

    getProfile: builder.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
    }),
    // updatePassword: builder.mutation({
    //   query: (body) => ({
    //     url: "/admin/password",
    //     method: "PUT",
    //     body,
    //     headers: {
    //       Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
    //     },
    //   }),
    // }),
    createCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
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
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
      providesTags: ["Admins"],
    }),
    getAdminById: builder.query({
      query: (id: string) => ({
        url: `/admin/getAdmin/${id}`,
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),

      providesTags: ["Admins"],
    }),
    addAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/addAdmin",
        method: "POST",
        body,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),

      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/admin/deleteAdmin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),

      invalidatesTags: ["Admins"],
    }),
    editAdmin: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/admin/editAdmin/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
      invalidatesTags: ["Admins"],
    }),
    addUser: builder.mutation({
      query: (formData) => ({
        url: "/admin/user",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),

      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
      providesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/user/${id}`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
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
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTBhMjQ4ZjY1MDdkODhlNGY4ZjcyZTEiLCJpYXQiOjE3NzkwNjM4MzYsImV4cCI6MTc4NjgzOTgzNn0.u9xdEOHyEEpf24ivbkLtoL2R7sieMWiqpw6CFZnClWI`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
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
