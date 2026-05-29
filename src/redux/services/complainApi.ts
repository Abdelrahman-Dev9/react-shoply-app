import { baseApi } from "./baseApi";

export const complainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: () => ({
        url: "/complaint",
        method: "GET",
      }),
      providesTags: ["Complaints"],
    }),
  }),
});

export const { useGetComplaintsQuery } = complainApi;
