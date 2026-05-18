import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://priceo.vercel.app",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),

  tagTypes: ["Users", "Admins", "Products"],

  endpoints: () => ({}),
});
