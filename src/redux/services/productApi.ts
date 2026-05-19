import type { ProductsResponse } from "@/types/product.types";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, Record<string, unknown> | void>({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productApi;
