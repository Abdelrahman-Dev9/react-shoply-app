import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
