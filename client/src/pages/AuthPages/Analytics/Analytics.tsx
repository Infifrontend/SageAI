import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Clock,
  HardDrive,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Zap,
} from "lucide-react";
import "./Analytics.scss";
import {
  useLazyGetCommonAnalyticsDataQuery,
  useLazyGetMenuApiAnalyticsDataQuery,
  useLazyGetMenuPerformanceAnalyticsDataQuery,
} from "@/service/analytics/analytics";

interface APIMetric {
  name: string;
  endpoint: string;
  requests: string;
  avgResponse: string;
  successRate: string;
  growth: string;
  status: "healthy" | "good" | "warning";
}

interface EndpointDetail {
  endpoint: string;
  method: string;
  requests: string;
  avgResponse: string;
  successRate: string;
  errorRate: string;
  status: "healthy" | "warning" | "critical";
  lastChecked: string;
}

interface GeographicData {
  country: string;
  flag: string;
  percentage: string;
  requests: string;
  avgResponse: string;
}

interface RateLimitStatus {
  endpoint: string;
  status: "healthy" | "warning" | "critical";
  currentRate: string;
  limit: string;
  resetTime: string;
}

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  const [analyticsCommonData, analyticsCommonDataResponse] =
    useLazyGetCommonAnalyticsDataQuery();

  const [GetMenuApiAnalyticsData, GetMenuApiAnalyticsDataResponse] =
    useLazyGetMenuApiAnalyticsDataQuery();

  const [GetMenuPerformanceData, GetMenuPerformanceDataResponse] =
    useLazyGetMenuPerformanceAnalyticsDataQuery();

  // The following useEffect is triggered to get the sample data from static json file
  useEffect(() => {
    analyticsCommonData();
    GetMenuApiAnalyticsData();
    GetMenuPerformanceData();
  }, []);

  // The following useEffect is triggered when common data response is getting from API.
  useEffect(() => {
    if (analyticsCommonDataResponse?.isSuccess)
      console.log(analyticsCommonDataResponse?.data);
  }, [analyticsCommonDataResponse]);

  // The following useEffect is triggered when common data response is getting from API.
  useEffect(() => {
    if (GetMenuApiAnalyticsDataResponse?.isSuccess)
      console.log(GetMenuApiAnalyticsDataResponse?.data);
  }, [GetMenuApiAnalyticsDataResponse]);

  // The following useEffect is triggered when common data response is getting from API.
  useEffect(() => {
    if (GetMenuPerformanceDataResponse?.isSuccess)
      console.log(GetMenuPerformanceDataResponse?.data);
  }, [GetMenuPerformanceDataResponse]);

  const topAPIs: APIMetric[] = [
    {
      name: "Authentication API",
      endpoint: "POST /v1/auth/login",
      requests: "124,000",
      avgResponse: "89ms",
      successRate: "99.9%",
      growth: "+5.2%",
      status: "healthy",
    },
    {
      name: "User Data API",
      endpoint: "GET /v1/users/:id",
      requests: "89,000",
      avgResponse: "156ms",
      successRate: "99.6%",
      growth: "+3.1%",
      status: "good",
    },
    {
      name: "Analytics API",
      endpoint: "GET /v1/analytics/data",
      requests: "67,500",
      avgResponse: "234ms",
      successRate: "98.8%",
      growth: "+7.8%",
      status: "good",
    },
    {
      name: "Payment Processing",
      endpoint: "POST /v1/payments/process",
      requests: "45,300",
      avgResponse: "312ms",
      successRate: "99.2%",
      growth: "+2.4%",
      status: "good",
    },
    {
      name: "File Upload API",
      endpoint: "POST /v1/files/upload",
      requests: "34,500",
      avgResponse: "450ms",
      successRate: "97.8%",
      growth: "+1.8%",
      status: "warning",
    },
  ];

  const endpointDetails: EndpointDetail[] = [
    {
      endpoint: "/api/v1/auth/login",
      method: "POST",
      requests: "41,000",
      avgResponse: "89ms",
      successRate: "99.9%",
      errorRate: "0.1%",
      status: "healthy",
      lastChecked: "2 mins ago",
    },
    {
      endpoint: "/api/v1/users/profile",
      method: "GET",
      requests: "34,200",
      avgResponse: "134ms",
      successRate: "99.5%",
      errorRate: "0.5%",
      status: "healthy",
      lastChecked: "5 mins ago",
    },
    {
      endpoint: "/api/v1/data/process-data",
      method: "POST",
      requests: "28,900",
      avgResponse: "234ms",
      successRate: "98.2%",
      errorRate: "1.8%",
      status: "warning",
      lastChecked: "1 min ago",
    },
    {
      endpoint: "/api/v1/files/upload",
      method: "POST",
      requests: "18,400",
      avgResponse: "312ms",
      successRate: "97.3%",
      errorRate: "2.7%",
      status: "warning",
      lastChecked: "3 mins ago",
    },
    {
      endpoint: "/api/v1/payments/process",
      method: "POST",
      requests: "16,400",
      avgResponse: "402ms",
      successRate: "99.1%",
      errorRate: "0.9%",
      status: "healthy",
      lastChecked: "4 mins ago",
    },
  ];

  const geographicData: GeographicData[] = [
    {
      country: "United States",
      flag: "🇺🇸",
      percentage: "45.2%",
      requests: "156,320",
      avgResponse: "89ms",
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      percentage: "23.8%",
      requests: "82,340",
      avgResponse: "102ms",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      percentage: "13%",
      requests: "45,021",
      avgResponse: "95ms",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      percentage: "9.6%",
      requests: "33,214",
      avgResponse: "78ms",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      percentage: "4.1%",
      requests: "14,189",
      avgResponse: "124ms",
    },
  ];

  const rateLimitStatus: RateLimitStatus[] = [
    {
      endpoint: "POST /v1/auth",
      status: "healthy",
      currentRate: "245",
      limit: "1000",
      resetTime: "Resets in 30 mins",
    },
    {
      endpoint: "GET /v1/users",
      status: "healthy",
      currentRate: "678",
      limit: "2000",
      resetTime: "Resets in 15 mins",
    },
    {
      endpoint: "POST /v1/data",
      status: "warning",
      currentRate: "1,834",
      limit: "2000",
      resetTime: "Resets in 25 mins",
    },
    {
      endpoint: "POST /v1/payments",
      status: "critical",
      currentRate: "478",
      limit: "500",
      resetTime: "Resets in 10 mins",
    },
  ];

  return (
    <AppLayout
      title="API Analytics"
      subtitle="Detailed insights on API performance, usage patterns, and endpoint analytics"
    >
      <div className="cls-analytics-container">
        {/* Metrics Cards */}
        <div className="cls-metrics-grid">
          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">System Uptime</p>
                <h2 className="cls-metric-value">99.9%</h2>
              </div>
              <div className="cls-metric-icon cls-icon-blue">
                <Activity size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Avg. Response Time</p>
                <h2 className="cls-metric-value">45ms</h2>
              </div>
              <div className="cls-metric-icon cls-icon-green">
                <Clock size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Storage Used</p>
                <h2 className="cls-metric-value">2.3GB</h2>
              </div>
              <div className="cls-metric-icon cls-icon-yellow">
                <HardDrive size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Overall Health</p>
                <h2 className="cls-metric-value">0.8%</h2>
              </div>
              <div className="cls-metric-icon cls-icon-red">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Top Performing APIs */}
        <Card className="cls-section-card">
          <div className="cls-section-header">
            <div className="cls-section-title-row">
              <TrendingUp className="cls-section-icon" size={20} />
              <h2 className="cls-section-title">Top Performing APIs</h2>
            </div>
          </div>
          <CardContent className="cls-section-content">
            {topAPIs.map((api, index) => (
              <div key={index} className="cls-api-row">
                <div className="cls-api-left">
                  <div className="cls-api-icon">
                    <Zap size={20} />
                  </div>
                  <div className="cls-api-info">
                    <h3 className="cls-api-name">{api.name}</h3>
                    <p className="cls-api-endpoint">{api.endpoint}</p>
                  </div>
                </div>
                <div className="cls-api-right">
                  <div className="cls-api-metrics">
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Requests</span>
                      <span className="cls-metric-value">{api.requests}</span>
                    </div>
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Avg Response</span>
                      <span className="cls-metric-value">
                        {api.avgResponse}
                      </span>
                    </div>
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Success Rate</span>
                      <span className="cls-metric-value">
                        {api.successRate}
                      </span>
                    </div>
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Growth</span>
                      <span className="cls-metric-value cls-growth">
                        {api.growth}
                      </span>
                    </div>
                  </div>
                  <div className="cls-performance-score-section">
                    <Badge className={`cls-status-badge cls-${api.status}`}>
                      {api.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* API Endpoint Details */}
        <Card className="cls-endpoint-card">
          <div className="cls-section-header">
            <div className="cls-section-title-row">
              <Activity className="cls-section-icon" size={20} />
              <div>
                <h2 className="cls-section-title">API Endpoint Details</h2>
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="cls-filter-select">
                <SelectValue placeholder="All Endpoints" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Endpoints</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="cls-endpoint-content">
            {endpointDetails.map((endpoint, index) => (
              <div key={index} className="cls-endpoint-item">
                <div className="cls-endpoint-main-row">
                  <div className="cls-endpoint-left-section">
                    <span
                      className={`cls-method cls-${endpoint.method.toLowerCase()}`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="cls-endpoint-path">
                      {endpoint.endpoint}
                    </span>
                    <Badge
                      className={`cls-status-badge cls-${endpoint.status}`}
                    >
                      {endpoint.status}
                    </Badge>
                    <p className="cls-last-checked">
                      <Clock size={12} className="cls-clock-icon" />
                      Last error: {endpoint.lastChecked}
                    </p>
                  </div>
                  <div className="cls-endpoint-stats-row">
                    <div className="cls-stat-column">
                      <Zap size={16} className="cls-stat-icon-purple" />
                      <div className="cls-stat-info">
                        <span className="cls-stat-label">Requests</span>
                        <span className="cls-stat-value">
                          {endpoint.requests}
                        </span>
                      </div>
                    </div>
                    <div className="cls-stat-column">
                      <Clock size={16} className="cls-stat-icon-yellow" />
                      <div className="cls-stat-info">
                        <span className="cls-stat-label">Avg Response</span>
                        <span className="cls-stat-value">
                          {endpoint.avgResponse}
                        </span>
                      </div>
                    </div>
                    <div className="cls-stat-column">
                      <CheckCircle2 size={16} className="cls-stat-icon-green" />
                      <div className="cls-stat-info">
                        <span className="cls-stat-label">Success Rate</span>
                        <span className="cls-stat-value">
                          {endpoint.successRate}
                        </span>
                      </div>
                    </div>
                    <div className="cls-stat-column">
                      <Activity size={16} className="cls-stat-icon-red" />
                      <div className="cls-stat-info">
                        <span className="cls-stat-label">Error Rate</span>
                        <span className="cls-stat-value">
                          {endpoint.errorRate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Two Column Layout: Rate Limiting & Geographic */}
        <div className="cls-two-column-layout">
          {/* Rate Limiting Status */}
          <Card className="cls-rate-limit-card">
            <div className="cls-section-header">
              <div className="cls-section-title-row">
                <Activity className="cls-section-icon" size={20} />
                <h2 className="cls-section-title">Rate Limiting Status</h2>
              </div>
            </div>
            <div className="cls-rate-limit-content">
              {rateLimitStatus.map((rate, index) => (
                <div key={index} className="cls-rate-limit-item">
                  <div className="cls-rate-limit-header">
                    <span className="cls-rate-endpoint">{rate.endpoint}</span>
                    <Badge className={`cls-status-badge cls-${rate.status}`}>
                      {rate.status}
                    </Badge>
                  </div>
                  <div className="cls-rate-stats">
                    <span>
                      <strong>{rate.currentRate}</strong> / {rate.limit}{" "}
                      requests
                    </span>
                  </div>
                  <p className="cls-reset-time">{rate.resetTime}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Geographic Usage Distribution (moved to two-column) */}
          <Card className="cls-geographic-card">
            <div className="cls-section-header">
              <div className="cls-section-title-row">
                <Activity className="cls-section-icon" size={20} />
                <h2 className="cls-section-title">
                  Geographic Usage Distribution
                </h2>
              </div>
            </div>
            <div className="cls-geographic-content">
              <p className="cls-total-requests">
                Total Global Requests: 345,000
              </p>
              {geographicData.map((country, index) => (
                <div key={index} className="cls-country-row">
                  <div className="cls-country-info">
                    <span className="cls-country-flag">{country.flag}</span>
                    <span className="cls-country-name">{country.country}</span>
                  </div>
                  <div className="cls-country-stats">
                    <span className="cls-country-percentage">
                      {country.percentage}
                    </span>
                    <span>•</span>
                    <span>{country.requests} requests</span>
                    <span>•</span>
                    <span>{country.avgResponse} avg</span>
                  </div>
                  <div className="cls-country-bar-container">
                    <div
                      className="cls-country-bar"
                      style={{ width: country.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Monitoring */}
        <Card className="cls-monitoring-card">
          <div className="cls-monitoring-content">
            <div className="cls-chart-header">
              <div className="cls-chart-title-row">
                <Activity className="cls-chart-icon" size={20} />
                <h2 className="cls-chart-title">System Performance Metrics</h2>
              </div>
              <div className="cls-chart-actions">
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="cls-timeframe-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <button className="cls-refresh-button">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            <div className="cls-chart-placeholder">
              <div className="cls-performance-chart">
                {/* Chart placeholder - would use a charting library like recharts */}
                <svg viewBox="0 0 800 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                    <linearGradient
                      id="gradient3"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>
                  {/* Example wavy chart paths */}
                  <path
                    d="M0,150 Q100,120 200,140 T400,130 T600,145 T800,135 L800,300 L0,300 Z"
                    fill="url(#gradient1)"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,180 Q100,160 200,170 T400,165 T600,175 T800,170 L800,300 L0,300 Z"
                    fill="url(#gradient2)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,210 Q100,190 200,200 T400,195 T600,205 T800,200 L800,300 L0,300 Z"
                    fill="url(#gradient3)"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="cls-chart-labels">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>00:00</span>
              </div>
            </div>
            <div className="cls-chart-legend">
              <div className="cls-legend-item">
                <div className="cls-legend-dot cls-green" />
                <span>Response Time</span>
              </div>
              <div className="cls-legend-item">
                <div className="cls-legend-dot cls-blue" />
                <span>Throughput</span>
              </div>
              <div className="cls-legend-item">
                <div className="cls-legend-dot cls-purple" />
                <span>Error Rate</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
