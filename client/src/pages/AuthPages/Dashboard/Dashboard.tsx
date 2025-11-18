import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Activity,
  Users,
  Zap,
  Database,
  Globe,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";
import "./Dashboard.scss";

export default function Dashboard() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("all");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("30");

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Real-time analytics, AI insights, and system health monitoring"
    >
      <div className="cls-dashboard-container">
        {/* Header */}
        <div className="cls-dashboard-header">
          {/* <div>
          <h1 className="cls-page-title">Dashboard</h1>
          <p className="cls-page-subtitle">
            Real-time analytics, AI insights, and system health monitoring
          </p>
        </div> */}
          {/* <div className="cls-header-actions">
            <Button variant="outline" size="sm">
              <Clock className="cls-icon" />
            </Button>
            <Button variant="outline" size="sm">
              <AlertCircle className="cls-icon" />
            </Button>
          </div> */}
        </div>

        {/* Metrics Cards */}
        <div className="cls-metrics-grid">
          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Total API Calls</p>
                <h2 className="cls-metric-value">1.2M</h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 5.2%
                </p>
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
                <h2 className="cls-metric-value">120ms</h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 3.1%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-green">
                <Zap size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Current Usage</p>
                <h2 className="cls-metric-value">84%</h2>
                <p className="cls-metric-change cls-negative">
                  <TrendingDown size={14} /> 2.3%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-yellow">
                <Cpu size={24} />
              </div>
            </div>
          </Card>

          <Card className="cls-metric-card">
            <div className="cls-metric-content">
              <div>
                <p className="cls-metric-label">Error Rate</p>
                <h2 className="cls-metric-value">0.8%</h2>
                <p className="cls-metric-change cls-positive">
                  <TrendingUp size={14} /> 0.3%
                </p>
              </div>
              <div className="cls-metric-icon cls-icon-red">
                <AlertCircle size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Alert Banner */}
        <div className="cls-alert-banner">
          <AlertCircle className="cls-alert-icon" />
          <div className="cls-alert-content">
            <p className="cls-alert-text">
              You're approaching your usage cap - 84% of your quota is used.
            </p>
            <p className="cls-alert-subtext">
              Upgrade your plan to prevent service disruption.
            </p>
          </div>
          <div className="cls-alert-actions">
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
            <Button size="sm" className="cls-upgrade-button">
              Upgrade Plan
            </Button>
          </div>
        </div>

        {/* AI Insights & Recommendations */}
        <div className="cls-section">
          <div className="cls-section-header">
            <h2 className="cls-section-title">AI Insights & Recommendations</h2>
            <p className="cls-section-subtitle">
              Proactive insights to improve performance and reduce costs
            </p>
          </div>

          <div className="cls-insights-grid">
            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Zap className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Optimize Rate Limiting
                    <Badge className="cls-badge-urgent">Urgent</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Detected spikes 25% above average. Consider adding rate
                    limits.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Scale Resources
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Database className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Database Query Lag
                    <Badge className="cls-badge-high">High</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Slow DB queries detected. Add index on 'users.email' for
                    best perf.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Investigate
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Activity className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Performance Optimization
                    <Badge className="cls-badge-medium">Medium</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    CDN options for /images/* endpoints can cut load time by ~
                    32%.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Optimize Now
              </Button>
            </Card>

            <Card className="cls-insight-card">
              <div className="cls-insight-header">
                <Shield className="cls-insight-icon" />
                <div>
                  <h3 className="cls-insight-title">
                    Cost Optimization
                    <Badge className="cls-badge-low">Low</Badge>
                  </h3>
                  <p className="cls-insight-description">
                    Reduce resource use by caching during off-peak hours to save
                    ~15%.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Adjust Instance
              </Button>
            </Card>
          </div>
        </div>

        {/* Charts Row */}
        <div className="cls-charts-row">
          {/* API Calls Over Time */}
          <Card className="cls-chart-card">
            <div className="cls-chart-header">
              <h3 className="cls-chart-title">API Calls Over Time</h3>
              <div className="cls-chart-filters">
                <Select
                  value={selectedEndpoint}
                  onValueChange={setSelectedEndpoint}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Endpoints</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedTimePeriod}
                  onValueChange={setSelectedTimePeriod}
                >
                  <SelectTrigger className="cls-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="cls-chart-placeholder">
              <svg viewBox="0 0 400 200" className="cls-line-chart">
                <polyline
                  points="10,150 40,120 70,140 100,80 130,100 160,60 190,90 220,70 250,100 280,80 310,110 340,90 370,100"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
              </svg>
              <div className="cls-chart-labels">
                <span>Oct 01</span>
                <span>Oct 20</span>
                <span>Nov 8</span>
                <span>Nov 16</span>
                <span>Nov 30</span>
              </div>
            </div>
          </Card>

          {/* Response Time Analytics */}
          <Card className="cls-chart-card">
            <div className="cls-chart-header">
              <h3 className="cls-chart-title">Response Time Analytics</h3>
              <Select defaultValue="all-apis">
                <SelectTrigger className="cls-select-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-apis">All APIs</SelectItem>
                  <SelectItem value="payments">Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="cls-chart-placeholder">
              <svg viewBox="0 0 400 200" className="cls-area-chart">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10,100 Q 100,80 190,90 T 370,85 L 370,200 L 10,200 Z"
                  fill="url(#grad1)"
                />
                <path
                  d="M 10,120 Q 100,105 190,110 T 370,105 L 370,200 L 10,200 Z"
                  fill="url(#grad2)"
                />
                <path
                  d="M 10,140 Q 100,130 190,135 T 370,130 L 370,200 L 10,200 Z"
                  fill="url(#grad3)"
                />
                <path
                  d="M 10,160 Q 100,155 190,158 T 370,155 L 370,200 L 10,200 Z"
                  fill="url(#grad4)"
                />
              </svg>
              <div className="cls-chart-legend">
                <div className="cls-legend-item">
                  <span className="cls-legend-dot cls-red"></span>
                  Payments
                </div>
                <div className="cls-legend-item">
                  <span className="cls-legend-dot cls-orange"></span>
                  Analytics
                </div>
                <div className="cls-legend-item">
                  <span className="cls-legend-dot cls-green"></span>
                  User Data
                </div>
                <div className="cls-legend-item">
                  <span className="cls-legend-dot cls-blue"></span>
                  Authentication
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Summary & System Services */}
        <div className="cls-bottom-row">
          {/* Performance Summary */}
          <Card className="cls-performance-card">
            <h3 className="cls-card-title">Performance Summary</h3>
            <div className="cls-performance-list">
              <div className="cls-performance-item">
                <div className="cls-performance-info">
                  <p className="cls-performance-name">Authentication</p>
                  <p className="cls-performance-value">89ms</p>
                  <p className="cls-performance-prev">Prev: 94ms</p>
                </div>
                <div className="cls-performance-status">
                  <Badge className="cls-badge-improved">+5.3%</Badge>
                  <span className="cls-status-text cls-improved">Improved</span>
                </div>
              </div>

              <div className="cls-performance-item">
                <div className="cls-performance-info">
                  <p className="cls-performance-name">User Data</p>
                  <p className="cls-performance-value">156ms</p>
                  <p className="cls-performance-prev">Prev: 162ms</p>
                </div>
                <div className="cls-performance-status">
                  <Badge className="cls-badge-improved">+3.7%</Badge>
                  <span className="cls-status-text cls-improved">Improved</span>
                </div>
              </div>

              <div className="cls-performance-item">
                <div className="cls-performance-info">
                  <p className="cls-performance-name">Analytics</p>
                  <p className="cls-performance-value">234ms</p>
                  <p className="cls-performance-prev">Prev: 240ms</p>
                </div>
                <div className="cls-performance-status">
                  <Badge className="cls-badge-improved">+2.5%</Badge>
                  <span className="cls-status-text cls-improved">Improved</span>
                </div>
              </div>

              <div className="cls-performance-item">
                <div className="cls-performance-info">
                  <p className="cls-performance-name">Payments</p>
                  <p className="cls-performance-value">312ms</p>
                  <p className="cls-performance-prev">Prev: 296ms</p>
                </div>
                <div className="cls-performance-status">
                  <Badge className="cls-badge-slower">-5.4%</Badge>
                  <span className="cls-status-text cls-slower">Slower</span>
                </div>
              </div>
            </div>
          </Card>

          {/* System Services Status */}
          <Card className="cls-services-card">
            <h3 className="cls-card-title">System Services Status</h3>
            <p className="cls-card-subtitle">
              Real-time status of all critical system services.
            </p>
            <div className="cls-services-list">
              <div className="cls-service-item">
                <div className="cls-service-header">
                  <Globe className="cls-service-icon" />
                  <div className="cls-service-info">
                    <p className="cls-service-name">API Gateway</p>
                    <Badge className="cls-badge-healthy">Healthy</Badge>
                  </div>
                </div>
                <div className="cls-service-details">
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Response Time:</span>
                    <span className="cls-metric-val">50ms</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Uptime:</span>
                    <span className="cls-metric-val">99.9%</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Last Check:</span>
                    <span className="cls-metric-val">1m ago</span>
                  </div>
                </div>
              </div>

              <div className="cls-service-item">
                <div className="cls-service-header">
                  <Database className="cls-service-icon" />
                  <div className="cls-service-info">
                    <p className="cls-service-name">Database Cluster</p>
                    <Badge className="cls-badge-healthy">Healthy</Badge>
                  </div>
                </div>
                <div className="cls-service-details">
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Response Time:</span>
                    <span className="cls-metric-val">80ms</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Uptime:</span>
                    <span className="cls-metric-val">99.9%</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Last Check:</span>
                    <span className="cls-metric-val">30s ago</span>
                  </div>
                </div>
              </div>

              <div className="cls-service-item">
                <div className="cls-service-header">
                  <Shield className="cls-service-icon" />
                  <div className="cls-service-info">
                    <p className="cls-service-name">Load Balancer</p>
                    <Badge className="cls-badge-healthy">Healthy</Badge>
                  </div>
                </div>
                <div className="cls-service-details">
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Response Time:</span>
                    <span className="cls-metric-val">42ms</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Uptime:</span>
                    <span className="cls-metric-val">99.9%</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Last Check:</span>
                    <span className="cls-metric-val">30s ago</span>
                  </div>
                </div>
              </div>

              <div className="cls-service-item">
                <div className="cls-service-header">
                  <HardDrive className="cls-service-icon" />
                  <div className="cls-service-info">
                    <p className="cls-service-name">Cache Layer</p>
                    <Badge className="cls-badge-warning">Warning</Badge>
                  </div>
                </div>
                <div className="cls-service-details">
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Response Time:</span>
                    <span className="cls-metric-val">300ms</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Uptime:</span>
                    <span className="cls-metric-val">99.5%</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Last Check:</span>
                    <span className="cls-metric-val">1m ago</span>
                  </div>
                </div>
              </div>

              <div className="cls-service-item">
                <div className="cls-service-header">
                  <Zap className="cls-service-icon" />
                  <div className="cls-service-info">
                    <p className="cls-service-name">Auth Service</p>
                    <Badge className="cls-badge-critical">Critical</Badge>
                  </div>
                </div>
                <div className="cls-service-details">
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Response Time:</span>
                    <span className="cls-metric-val">600ms</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Uptime:</span>
                    <span className="cls-metric-val">99.2%</span>
                  </div>
                  <div className="cls-service-metric">
                    <span className="cls-metric-name">Last Check:</span>
                    <span className="cls-metric-val">5m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Resource Usage & Recent Incidents */}
        <div className="cls-bottom-row">
          {/* Resource Usage */}
          <Card className="cls-resource-card">
            <div className="cls-resource-header">
              <Activity className="cls-resource-icon" />
              <h3 className="cls-card-title">Resource Usage</h3>
            </div>
            <div className="cls-resource-list">
              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Cpu className="cls-resource-type-icon" />
                  <span className="cls-resource-name">CPU Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">45%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Database className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Memory Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">62%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <HardDrive className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Disk Usage</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill cls-warning"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">78%</span>
                </div>
              </div>

              <div className="cls-resource-item">
                <div className="cls-resource-info">
                  <Wifi className="cls-resource-type-icon" />
                  <span className="cls-resource-name">Network I/O</span>
                </div>
                <div className="cls-resource-metrics">
                  <div className="cls-progress-bar">
                    <div
                      className="cls-progress-fill"
                      style={{ width: "34%" }}
                    ></div>
                  </div>
                  <span className="cls-resource-percent">34%</span>
                </div>
              </div>
            </div>
            <div className="cls-system-health">
              <span className="cls-health-label">Overall System Health</span>
              <Badge className="cls-badge-operational">Operational</Badge>
            </div>
          </Card>

          {/* Recent Incidents */}
          <Card className="cls-incidents-card">
            <div className="cls-incidents-header">
              <AlertCircle className="cls-incidents-icon" />
              <h3 className="cls-card-title">Recent Incidents</h3>
              <Button variant="ghost" size="sm" className="cls-view-all">
                View All
              </Button>
            </div>
            <div className="cls-incidents-list">
              <div className="cls-incident-item">
                <div className="cls-incident-info">
                  <p className="cls-incident-title">
                    Cache Layer Latency Spike
                  </p>
                  <p className="cls-incident-description">
                    Increased response times in cache layer
                  </p>
                  <p className="cls-incident-time">3 days ago</p>
                </div>
                <Badge className="cls-badge-warning-small">warning</Badge>
              </div>

              <div className="cls-incident-item">
                <div className="cls-incident-info">
                  <p className="cls-incident-title">
                    Database Connection Pool Full
                  </p>
                  <p className="cls-incident-description">
                    Temporary connection pool exhaustion
                  </p>
                  <p className="cls-incident-time">1 week ago</p>
                </div>
                <Badge className="cls-badge-resolved">resolved</Badge>
              </div>

              <div className="cls-incident-item">
                <div className="cls-incident-info">
                  <p className="cls-incident-title">API Rate Limit Exceeded</p>
                  <p className="cls-incident-description">
                    Burst rate limit threshold breached
                  </p>
                  <p className="cls-incident-time">1 week ago</p>
                </div>
                <Badge className="cls-badge-info">info</Badge>
              </div>

              <div className="cls-incident-item cls-no-incidents">
                <div className="cls-incident-info">
                  <p className="cls-incident-title">No Active Incidents</p>
                  <p className="cls-incident-description">
                    All systems are operating normally
                  </p>
                </div>
                <Badge className="cls-badge-success">Resolved</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
