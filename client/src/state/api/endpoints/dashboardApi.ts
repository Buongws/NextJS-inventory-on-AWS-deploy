import { DashboardMetrics } from "../../models/dashboard";
import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardMetricsQuery } = dashboardApi;
