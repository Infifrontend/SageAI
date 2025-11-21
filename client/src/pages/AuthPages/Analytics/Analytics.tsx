
import { useState } from "react";
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
} from "lucide-react";
import "./Analytics.scss";

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
  const [selectedEndpoint, setSelectedEndpoint] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

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
      endpoint: "POST /api/v1/auth/login",
      method: "POST",
      requests: "41,000",
      avgResponse: "89ms",
      successRate: "99.9%",
      errorRate: "0.1%",
      status: "healthy",
      lastChecked: "2 mins ago",
    },
    {
      endpoint: "GET /api/v1/users/profile",
      method: "GET",
      requests: "34,200",
      avgResponse: "134ms",
      successRate: "99.5%",
      errorRate: "0.5%",
      status: "healthy",
      lastChecked: "5 mins ago",
    },
    {
      endpoint: "POST /api/v1/data/process-data",
      method: "POST",
      requests: "28,900",
      avgResponse: "234ms",
      successRate: "98.2%",
      errorRate: "1.8%",
      status: "warning",
      lastChecked: "1 min ago",
    },
    {
      endpoint: "POST /api/v1/files/upload",
      method: "POST",
      requests: "18,400",
      avgResponse: "312ms",
      successRate: "97.3%",
      errorRate: "2.7%",
      status: "warning",
      lastChecked: "3 mins ago",
    },
    {
      endpoint: "POST /api/v1/payments/process",
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
        {/* Top Metrics */}
        <div className="cls-metrics-row">
          <Card className="cls-metric-card">
            <CardContent className="cls-metric-content">
              <div className="cls-metric-header">
                <p className="cls-metric-label">System Uptime</p>
                <div className="cls-metric-icon cls-info">
                  <Activity size={18} />
                </div>
              </div>
              <h2 className="cls-metric-value">99.9%</h2>
            </CardContent>
          </Card>

          <Card className="cls-metric-card">
            <CardContent className="cls-metric-content">
              <div className="cls-metric-header">
                <p className="cls-metric-label">Avg Response Time</p>
                <div className="cls-metric-icon cls-success">
                  <Clock size={18} />
                </div>
              </div>
              <h2 className="cls-metric-value">45ms</h2>
            </CardContent>
          </Card>

          <Card className="cls-metric-card">
            <CardContent className="cls-metric-content">
              <div className="cls-metric-header">
                <p className="cls-metric-label">Storage Used</p>
                <div className="cls-metric-icon cls-warning">
                  <HardDrive size={18} />
                </div>
              </div>
              <h2 className="cls-metric-value">2.3GB</h2>
            </CardContent>
          </Card>

          <Card className="cls-metric-card">
            <CardContent className="cls-metric-content">
              <div className="cls-metric-header">
                <p className="cls-metric-label">Overall Health</p>
                <div className="cls-metric-icon cls-operational">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <h2 className="cls-metric-value cls-operational-text">
                Operational
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing APIs */}
        <Card className="cls-section-card">
          <div className="cls-section-header">
            <div className="cls-section-title-row">
              <TrendingUp className="cls-section-icon" size={20} />
              <h3 className="cls-section-title">Top Performing APIs</h3>
            </div>
          </div>
          <CardContent className="cls-section-content">
            {topAPIs.map((api, index) => (
              <div key={index} className="cls-api-row">
                <div className="cls-api-left">
                  <div className="cls-api-icon">
                    <Activity size={20} />
                  </div>
                  <div className="cls-api-info">
                    <h4 className="cls-api-name">{api.name}</h4>
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
                      <span className="cls-metric-value">{api.avgResponse}</span>
                    </div>
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Success Rate</span>
                      <span className="cls-metric-value">{api.successRate}</span>
                    </div>
                    <div className="cls-metric-item">
                      <span className="cls-metric-label">Growth</span>
                      <span className="cls-metric-value cls-growth">
                        {api.growth}
                      </span>
                    </div>
                    <Badge
                      className={`cls-status-badge cls-${api.status}`}
                    >
                      {api.status}
                    </Badge>
                  </div>
                </div>
                <div className="cls-performance-score-section">
                  <span className="cls-performance-label">Performance Score</span>
                  <span className="cls-performance-value">{api.successRate}</span>
                  <div className="cls-progress-bar-container">
                    <div
                      className={`cls-progress-bar cls-${api.status}`}
                      style={{ width: api.successRate }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="cls-two-column-layout">
          {/* API Endpoint Details */}
          <Card className="cls-endpoint-card">
            <div className="cls-section-header">
              <h3 className="cls-section-title">API Endpoint Details</h3>
              <Select
                value={selectedEndpoint}
                onValueChange={setSelectedEndpoint}
              >
                <SelectTrigger className="cls-filter-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Endpoints</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardContent className="cls-endpoint-content">
              {endpointDetails.map((endpoint, index) => (
                <div key={index} className="cls-endpoint-item">
                  <div className="cls-endpoint-header">
                    <div className="cls-endpoint-title">
                      <span className={`cls-method cls-${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </span>
                      <span className="cls-endpoint-path">
                        {endpoint.endpoint}
                      </span>
                    </div>
                    <Badge className={`cls-status-badge cls-${endpoint.status}`}>
                      {endpoint.status}
                    </Badge>
                  </div>
                  <p className="cls-last-checked">
                    <Clock size={12} className="cls-clock-icon" />
                    Last error: {endpoint.lastChecked}
                  </p>
                  <div className="cls-endpoint-stats">
                    <div className="cls-stat">
                      <Activity size={14} className="cls-stat-icon" />
                      <div className="cls-stat-content">
                        <span className="cls-stat-label">Requests</span>
                        <span className="cls-stat-value">{endpoint.requests}</span>
                      </div>
                    </div>
                    <div className="cls-stat">
                      <Clock size={14} className="cls-stat-icon" />
                      <div className="cls-stat-content">
                        <span className="cls-stat-label">Avg Response</span>
                        <span className="cls-stat-value">{endpoint.avgResponse}</span>
                      </div>
                    </div>
                    <div className="cls-stat">
                      <CheckCircle2 size={14} className="cls-stat-icon cls-success-icon" />
                      <div className="cls-stat-content">
                        <span className="cls-stat-label">Success Rate</span>
                        <span className="cls-stat-value">{endpoint.successRate}</span>
                      </div>
                    </div>
                    <div className="cls-stat">
                      <Activity size={14} className="cls-stat-icon cls-error-icon" />
                      <div className="cls-stat-content">
                        <span className="cls-stat-label">Error Rate</span>
                        <span className="cls-stat-value">{endpoint.errorRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rate Limiting Status */}
          <Card className="cls-rate-limit-card">
            <div className="cls-section-header">
              <h3 className="cls-section-title">Rate Limiting Status</h3>
            </div>
            <CardContent className="cls-rate-limit-content">
              {rateLimitStatus.map((item, index) => (
                <div key={index} className="cls-rate-limit-item">
                  <div className="cls-rate-limit-header">
                    <span className="cls-rate-endpoint">{item.endpoint}</span>
                    <Badge className={`cls-status-badge cls-${item.status}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="cls-rate-stats">
                    <span className="cls-rate-current">
                      Current Rate: <strong>{item.currentRate}</strong>
                    </span>
                    <span className="cls-rate-limit">
                      Limit: <strong>{item.limit}</strong>
                    </span>
                  </div>
                  <p className="cls-reset-time">{item.resetTime}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Geographic Usage Distribution */}
        <Card className="cls-geographic-card">
          <div className="cls-section-header">
            <h3 className="cls-section-title">Geographic Usage Distribution</h3>
          </div>
          <CardContent className="cls-geographic-content">
            <p className="cls-total-requests">Total Global Requests: 346,000</p>
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
                  <span className="cls-country-requests">
                    {country.requests} requests
                  </span>
                  <span className="cls-country-response">
                    Avg Response: {country.avgResponse}
                  </span>
                </div>
                <div className="cls-country-bar-container">
                  <div
                    className="cls-country-bar"
                    style={{ width: country.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Monitoring */}
        <Card className="cls-monitoring-card">
          <div className="cls-section-header">
            <h3 className="cls-section-title">System Monitoring</h3>
            <p className="cls-section-subtitle">
              Real-time system and performance monitoring
            </p>
          </div>
          <CardContent className="cls-monitoring-content">
            <div className="cls-chart-header">
              <div className="cls-chart-title-row">
                <Activity className="cls-chart-icon" size={18} />
                <h4 className="cls-chart-title">System Performance Metrics</h4>
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
                    <SelectItem value="24h">24h</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                  </SelectContent>
                </Select>
                <button className="cls-refresh-button">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            <div className="cls-chart-placeholder">
              <svg viewBox="0 0 800 300" className="cls-performance-chart">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* CPU Usage */}
                <path
                  d="M 20,150 Q 120,130 220,140 T 420,135 T 620,145 T 780,140"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <path
                  d="M 20,150 Q 120,130 220,140 T 420,135 T 620,145 T 780,140 L 780,300 L 20,300 Z"
                  fill="url(#grad1)"
                />
                {/* Memory Usage */}
                <path
                  d="M 20,180 Q 120,165 220,170 T 420,168 T 620,175 T 780,172"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <path
                  d="M 20,180 Q 120,165 220,170 T 420,168 T 620,175 T 780,172 L 780,300 L 20,300 Z"
                  fill="url(#grad2)"
                />
                {/* Network I/O */}
                <path
                  d="M 20,210 Q 120,195 220,200 T 420,198 T 620,205 T 780,202"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
                <path
                  d="M 20,210 Q 120,195 220,200 T 420,198 T 620,205 T 780,202 L 780,300 L 20,300 Z"
                  fill="url(#grad3)"
                />
              </svg>
              <div className="cls-chart-labels">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>
            <div className="cls-chart-legend">
              <div className="cls-legend-item">
                <span className="cls-legend-dot cls-green"></span>
                <span>CPU Usage</span>
              </div>
              <div className="cls-legend-item">
                <span className="cls-legend-dot cls-blue"></span>
                <span>Memory Usage</span>
              </div>
              <div className="cls-legend-item">
                <span className="cls-legend-dot cls-purple"></span>
                <span>Network I/O</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
