import { CommonService } from "../service";

const dashboardService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getCommonDashboardData: build.query<any, void>({
      query: () => "/api/dashboard/common",
    }),
    getApiCallData: build.query<any, void>({
      query: () => "/api/dashboard/api-calls",
    }),
    getResponseTimeData: build.query<any, void>({
      query: () => "/api/dashboard/response-time",
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetApiCallDataQuery,
  useLazyGetCommonDashboardDataQuery,
  useLazyGetResponseTimeDataQuery,
} = dashboardService;
