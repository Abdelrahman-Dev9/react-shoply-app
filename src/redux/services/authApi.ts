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
    createAdmin: builder.mutation({
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
    getUsers: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWZiMTU2NzRjMDI4NTI0MDE4ZWQ3OGEiLCJpYXQiOjE3NzgyMDgxNDIsImV4cCI6MTc4NTk4NDE0Mn0.6Vmv44JIuBFeXhIEVV_O4OWOG7GLnuufYbmg7TKcxHw`,
        },
      }),
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
      }),
      providesTags: ["Products"],
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
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetUsersQuery,
  useGetProductsQuery,
} = authApi;
