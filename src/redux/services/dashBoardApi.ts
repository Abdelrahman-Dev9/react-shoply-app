import { baseApi } from "./baseApi";

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: "/admin/statistics",
        method: "GET",
      }),
    }),
    getTaxes: builder.query({
      query: () => "/admin/taxes/6a09829aae7b2ce661e0afc6",
      providesTags: ["Taxes"],
    }),
    updateTaxes: builder.mutation({
      query: (body) => ({
        url: "/admin/taxes/6a09829aae7b2ce661e0afc6",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Taxes"],
    }),
    getCoupons: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupons"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, body }) => ({
        url: `/coupon/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Coupons"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
    getOrdersStats: builder.query({
      query: () => ({
        url: "/admin/ordersStats",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetTaxesQuery,
  useUpdateTaxesMutation,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetOrdersStatsQuery,
} = statisticsApi;
