import type { UsersResponse } from "@/types/user.types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: "/admin/user",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    addUser: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/admin/user",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation<void, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/user/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
