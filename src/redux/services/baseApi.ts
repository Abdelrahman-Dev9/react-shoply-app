import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://priceo.vercel.app",
  }),

  tagTypes: ["Users", "Admins", "Products"],

  endpoints: () => ({}),
});
