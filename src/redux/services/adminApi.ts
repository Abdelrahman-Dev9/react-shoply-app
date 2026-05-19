import type { AdminResponse, AdminsResponse } from "@/types/admin.types";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<AdminResponse, void>({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
      }),
    }),

    getAdmins: builder.query<AdminsResponse, void>({
      query: () => ({
        url: "/admin/getAdmins",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    getAdminById: builder.query<AdminResponse, string>({
      query: (id) => ({
        url: `/admin/getAdmin/${id}`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    addAdmin: builder.mutation<void, {
      name: string;
      email: string;
      password: string;
      phone: string;
    }>({
      query: (body) => ({
        url: "/admin/addAdmin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admins"],
    }),

    deleteAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/deleteAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),

    editAdmin: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/editAdmin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
} = adminApi;
