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
  }),
});

export const {
  useGetStatisticsQuery,
  useGetTaxesQuery,
  useUpdateTaxesMutation,
} = statisticsApi;
