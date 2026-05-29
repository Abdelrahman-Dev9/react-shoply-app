import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");
      if (token) headers.set("Authorization", token);
      return headers;
    },
  }),

  tagTypes: [
    "Users",
    "Admins",
    "Products",
    "Categories",
    "Orders",
    "Notifications",
    "Taxes",
    "Coupons",
    "Report",
    "Complaints",
  ],

  endpoints: () => ({}),
});
