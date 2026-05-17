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

    getProfile: builder.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),
    }),
    // updatePassword: builder.mutation({
    //   query: (body) => ({
    //     url: "/admin/password",
    //     method: "PUT",
    //     body,
    //     headers: {
    //       Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
    //     },
    //   }),
    // }),
    createCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),
      providesTags: ["Admins"],
    }),
    getAdminById: builder.query({
      query: (id: string) => ({
        url: `/admin/getAdmin/${id}`,
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),

      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/admin/deleteAdmin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),

      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
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
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
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
