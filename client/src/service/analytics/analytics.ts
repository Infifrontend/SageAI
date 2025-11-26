import { CommonService } from "../service";

const analyticsService = CommonService.injectEndpoints({
  endpoints: (build) => ({
    getCommonAnalyticsData: build.query<any, void>({
      query: () => "staticData/analytics/commonAnalytics.json",
    }),
    getMenuApiAnalyticsData: build.query<any, void>({
      query: () =>
        "staticData/analytics/Analytics_Menu_API_Endpoint_Details_section.json",
    }),
    getMenuPerformanceAnalyticsData: build.query<any, void>({
      query: () =>
        "staticData/analytics/Analytics_Menu_System_Performance_Metrics.json",
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetCommonAnalyticsDataQuery,
  useLazyGetMenuApiAnalyticsDataQuery,
  useLazyGetMenuPerformanceAnalyticsDataQuery,
} = analyticsService;
