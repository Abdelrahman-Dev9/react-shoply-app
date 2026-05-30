import { baseApi } from "./baseApi";

export interface Complaint {
  _id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
    role: string;
    profileImage: string;
  };
}

interface ComplaintResponse {
  status: string;
  count: number;
  data: Complaint[];
}

export const complainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query<ComplaintResponse, void>({
      query: () => ({
        url: "/complaint",
        method: "GET",
      }),
      providesTags: ["Complaints"],
    }),
  }),
});

export const { useGetComplaintsQuery } = complainApi;
