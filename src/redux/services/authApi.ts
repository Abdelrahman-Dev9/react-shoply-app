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
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
