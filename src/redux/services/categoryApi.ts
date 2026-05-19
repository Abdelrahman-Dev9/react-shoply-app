import type { CategoriesResponse } from "@/types/category.types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, Record<string, unknown> | void>({
      query: (params) => ({
        url: "/category",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Categories"],
    }),

    createCategory: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
