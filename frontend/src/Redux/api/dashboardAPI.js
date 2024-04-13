import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useStatsQuery } = dashboardApi;
