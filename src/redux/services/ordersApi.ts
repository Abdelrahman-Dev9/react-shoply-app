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
    payOrder: builder.mutation({
      query: (id) => ({ url: `/order/${id}/pay`, method: "PUT" }),
      invalidatesTags: ["Orders"],
    }),

    deliverOrder: builder.mutation({
      query: (id) => ({ url: `/order/${id}/deliver`, method: "PUT" }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = ordersApi;
