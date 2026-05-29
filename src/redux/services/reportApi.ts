import { baseApi } from "./baseApi";
interface ReportResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<ReportResponse, void>({
      query: () => ({
        url: "/report",
        method: "GET",
      }),
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetReportQuery } = reportApi;
