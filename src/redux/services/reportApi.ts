import { baseApi } from "./baseApi";

export interface Report {
  _id: string;
  title: string;
  ratings: number;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
    profileImage: string;
  };
}

interface ReportResponse {
  status: string;
  message: string;
  data: {
    reports: Report[];
    stats: {
      averageRating: string;
      percentage: string;
      totalReports: number;
    };
  };
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
