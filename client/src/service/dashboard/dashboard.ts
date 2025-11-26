import { CommonService } from "../service";

const dashboardService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getCommonDashboardData: build.query<any, void>({
      query: () => "staticData/dashboard/commonDashboard.json",
    }),
    getApiCallData: build.query<any, void>({
      query: () => "staticData/dashboard/api_calls_over_time.json",
    }),
    getResponseTimeData: build.query<any, void>({
      query: () => "staticData/dashboard/response_time_analytics.json",
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetApiCallDataQuery,
  useLazyGetCommonDashboardDataQuery,
  useLazyGetResponseTimeDataQuery,
} = dashboardService;
