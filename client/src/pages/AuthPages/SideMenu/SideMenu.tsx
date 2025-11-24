
import React from "react";
import { Activity, Zap, Database, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import "./SideMenu.scss";

export default function SideMenu() {
  return (
    <div className="side-menu-container">
      {/* Top Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card purple">
          <div className="metric-header">
            <Activity className="metric-icon" />
            <span className="metric-label">System Uptime</span>
          </div>
          <div className="metric-value">99.9%</div>
        </div>

        <div className="metric-card green">
          <div className="metric-header">
            <Zap className="metric-icon" />
            <span className="metric-label">Avg Response Time</span>
          </div>
          <div className="metric-value">45ms</div>
        </div>

        <div className="metric-card yellow">
          <div className="metric-header">
            <Database className="metric-icon" />
            <span className="metric-label">Storage Used</span>
          </div>
          <div className="metric-value">2.3GB</div>
        </div>

        <div className="metric-card status">
          <div className="metric-header">
            <CheckCircle className="metric-icon" />
            <span className="metric-label">Overall Health</span>
          </div>
          <div className="status-badge operational">Operational</div>
        </div>
      </div>

      {/* Top Performing APIs */}
      <div className="section-card">
        <div className="section-header">
          <TrendingUp className="section-icon" />
          <h2>Top Performing APIs</h2>
        </div>

        <div className="api-list">
          <div className="api-item">
            <div className="api-info">
              <div className="api-name">Authentication API</div>
              <div className="api-path">/api/v1/auth/*</div>
            </div>
            <div className="api-metrics">
              <div className="metric-col">
                <span className="label">Requests</span>
                <span className="value">104,000</span>
              </div>
              <div className="metric-col">
                <span className="label">Avg Response</span>
                <span className="value">89ms</span>
              </div>
              <div className="metric-col">
                <span className="label">Success Rate</span>
                <span className="value">99.8%</span>
              </div>
              <div className="metric-col">
                <span className="label">Growth</span>
                <span className="value growth-positive">+12%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill excellent" style={{ width: "99.8%" }}></div>
            </div>
          </div>

          <div className="api-item">
            <div className="api-info">
              <div className="api-name">User Data API</div>
              <div className="api-path">/api/v1/users/*</div>
            </div>
            <div className="api-metrics">
              <div className="metric-col">
                <span className="label">Requests</span>
                <span className="value">89,000</span>
              </div>
              <div className="metric-col">
                <span className="label">Avg Response</span>
                <span className="value">105ms</span>
              </div>
              <div className="metric-col">
                <span className="label">Success Rate</span>
                <span className="value">98.5%</span>
              </div>
              <div className="metric-col">
                <span className="label">Growth</span>
                <span className="value growth-positive">+8%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill good" style={{ width: "98.5%" }}></div>
            </div>
          </div>

          <div className="api-item">
            <div className="api-info">
              <div className="api-name">Analytics API</div>
              <div className="api-path">/api/v1/analytics/*</div>
            </div>
            <div className="api-metrics">
              <div className="metric-col">
                <span className="label">Requests</span>
                <span className="value">67,500</span>
              </div>
              <div className="metric-col">
                <span className="label">Avg Response</span>
                <span className="value">134ms</span>
              </div>
              <div className="metric-col">
                <span className="label">Success Rate</span>
                <span className="value">98.8%</span>
              </div>
              <div className="metric-col">
                <span className="label">Growth</span>
                <span className="value growth-positive">+15%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill good" style={{ width: "98.8%" }}></div>
            </div>
          </div>

          <div className="api-item">
            <div className="api-info">
              <div className="api-name">Payment Processing</div>
              <div className="api-path">/api/v1/payments/*</div>
            </div>
            <div className="api-metrics">
              <div className="metric-col">
                <span className="label">Requests</span>
                <span className="value">45,200</span>
              </div>
              <div className="metric-col">
                <span className="label">Avg Response</span>
                <span className="value">312ms</span>
              </div>
              <div className="metric-col">
                <span className="label">Success Rate</span>
                <span className="value">99.2%</span>
              </div>
              <div className="metric-col">
                <span className="label">Growth</span>
                <span className="value growth-positive">+6%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill excellent" style={{ width: "99.2%" }}></div>
            </div>
          </div>

          <div className="api-item">
            <div className="api-info">
              <div className="api-name">File Upload API</div>
              <div className="api-path">/api/v1/files/upload</div>
            </div>
            <div className="api-metrics">
              <div className="metric-col">
                <span className="label">Requests</span>
                <span className="value">34,500</span>
              </div>
              <div className="metric-col">
                <span className="label">Avg Response</span>
                <span className="value">567ms</span>
              </div>
              <div className="metric-col">
                <span className="label">Success Rate</span>
                <span className="value">97.8%</span>
              </div>
              <div className="metric-col">
                <span className="label">Growth</span>
                <span className="value growth-positive">+4%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill good" style={{ width: "97.8%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoint Details and Rate Limiting */}
      <div className="two-column-section">
        <div className="section-card endpoint-details">
          <div className="section-header">
            <h2>API Endpoint Details</h2>
            <select className="endpoint-filter">
              <option>All Endpoints</option>
            </select>
          </div>

          <div className="endpoint-list">
            <div className="endpoint-item">
              <div className="endpoint-method post">POST</div>
              <div className="endpoint-info">
                <div className="endpoint-path">/api/v1/auth/login</div>
                <div className="endpoint-time">
                  <Clock className="time-icon" />
                  Last error: 2 mins ago
                </div>
              </div>
              <div className="endpoint-stats">
                <div className="stat">
                  <span className="stat-label">Requests</span>
                  <span className="stat-value">41,000</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Response</span>
                  <span className="stat-value">89ms</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">99.8%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Error Rate</span>
                  <span className="stat-value">0.1%</span>
                </div>
              </div>
              <div className="endpoint-status healthy">healthy</div>
            </div>

            <div className="endpoint-item">
              <div className="endpoint-method get">GET</div>
              <div className="endpoint-info">
                <div className="endpoint-path">/api/v1/users/profile</div>
                <div className="endpoint-time">
                  <Clock className="time-icon" />
                  Last error: 5 mins ago
                </div>
              </div>
              <div className="endpoint-stats">
                <div className="stat">
                  <span className="stat-label">Requests</span>
                  <span className="stat-value">34,200</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Response</span>
                  <span className="stat-value">134ms</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">99.5%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Error Rate</span>
                  <span className="stat-value">0.5%</span>
                </div>
              </div>
              <div className="endpoint-status healthy">healthy</div>
            </div>

            <div className="endpoint-item">
              <div className="endpoint-method post">POST</div>
              <div className="endpoint-info">
                <div className="endpoint-path">/api/v1/data/process-data</div>
                <div className="endpoint-time">
                  <Clock className="time-icon" />
                  Last error: 1 min ago
                </div>
              </div>
              <div className="endpoint-stats">
                <div className="stat">
                  <span className="stat-label">Requests</span>
                  <span className="stat-value">28,900</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Response</span>
                  <span className="stat-value">234ms</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate</span>
                  <span className="stat-value">98.2%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Error Rate</span>
                  <span className="stat-value">1.8%</span>
                </div>
              </div>
              <div className="endpoint-status warning">warning</div>
            </div>
          </div>
        </div>

        <div className="section-card rate-limiting">
          <div className="section-header">
            <AlertCircle className="section-icon" />
            <h2>Rate Limiting Status</h2>
          </div>

          <div className="rate-limit-list">
            <div className="rate-limit-item">
              <div className="rate-limit-path">/api/v1/users/*</div>
              <div className="rate-limit-info">
                <span className="rate-limit-type">Tier 2 User</span>
                <span className="rate-limit-time">Resets in 45 mins</span>
              </div>
              <div className="rate-limit-usage">
                <span className="usage-text">8721 requests</span>
                <div className="usage-bar">
                  <div className="usage-fill warning" style={{ width: "87%" }}></div>
                </div>
              </div>
              <div className="rate-limit-status warning">warning</div>
            </div>

            <div className="rate-limit-item">
              <div className="rate-limit-path">/api/v1/analytics/*</div>
              <div className="rate-limit-info">
                <span className="rate-limit-type">Premium Tier</span>
                <span className="rate-limit-time">Resets in 12 mins</span>
              </div>
              <div className="rate-limit-usage">
                <span className="usage-text">4563 requests</span>
                <div className="usage-bar">
                  <div className="usage-fill good" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div className="rate-limit-status healthy">healthy</div>
            </div>

            <div className="rate-limit-item">
              <div className="rate-limit-path">/api/v1/payments/*</div>
              <div className="rate-limit-info">
                <span className="rate-limit-type">Standard Tier</span>
                <span className="rate-limit-time">Resets in 8 mins</span>
              </div>
              <div className="rate-limit-usage">
                <span className="usage-text">9845 requests</span>
                <div className="usage-bar">
                  <div className="usage-fill critical" style={{ width: "98%" }}></div>
                </div>
              </div>
              <div className="rate-limit-status critical">critical</div>
            </div>
          </div>

          <div className="rate-limit-note">
            <AlertCircle className="note-icon" />
            <div className="note-text">
              <strong>Warning:</strong> 3 endpoints approaching rate limit. Consider upgrading your billing plan.
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Usage Distribution */}
      <div className="section-card">
        <div className="section-header">
          <h2>Geographic Usage Distribution</h2>
        </div>

        <div className="geographic-list">
          <div className="geo-item">
            <div className="geo-flag">🇺🇸</div>
            <div className="geo-info">
              <div className="geo-country">United States</div>
              <div className="geo-region">North America</div>
            </div>
            <div className="geo-stats">
              <span className="geo-percentage">45.2%</span>
              <span className="geo-requests">156,000 requests</span>
              <span className="geo-growth">+7 Growth: 3%</span>
            </div>
            <div className="geo-bar">
              <div className="geo-fill" style={{ width: "45.2%" }}></div>
            </div>
          </div>

          <div className="geo-item">
            <div className="geo-flag">🇬🇧</div>
            <div className="geo-info">
              <div className="geo-country">United Kingdom</div>
              <div className="geo-region">Europe</div>
            </div>
            <div className="geo-stats">
              <span className="geo-percentage">23.8%</span>
              <span className="geo-requests">82,000 requests</span>
              <span className="geo-growth">+7 Growth: 5%</span>
            </div>
            <div className="geo-bar">
              <div className="geo-fill" style={{ width: "23.8%" }}></div>
            </div>
          </div>

          <div className="geo-item">
            <div className="geo-flag">🇩🇪</div>
            <div className="geo-info">
              <div className="geo-country">Germany</div>
              <div className="geo-region">Europe</div>
            </div>
            <div className="geo-stats">
              <span className="geo-percentage">12%</span>
              <span className="geo-requests">41,000 requests</span>
              <span className="geo-growth">+7 Growth: 2%</span>
            </div>
            <div className="geo-bar">
              <div className="geo-fill" style={{ width: "12%" }}></div>
            </div>
          </div>

          <div className="geo-item">
            <div className="geo-flag">🇨🇦</div>
            <div className="geo-info">
              <div className="geo-country">Canada</div>
              <div className="geo-region">North America</div>
            </div>
            <div className="geo-stats">
              <span className="geo-percentage">9.8%</span>
              <span className="geo-requests">34,000 requests</span>
              <span className="geo-growth">+7 Growth: 4%</span>
            </div>
            <div className="geo-bar">
              <div className="geo-fill" style={{ width: "9.8%" }}></div>
            </div>
          </div>

          <div className="geo-item">
            <div className="geo-flag">🇦🇺</div>
            <div className="geo-info">
              <div className="geo-country">Australia</div>
              <div className="geo-region">Asia-Pacific</div>
            </div>
            <div className="geo-stats">
              <span className="geo-percentage">6.1%</span>
              <span className="geo-requests">21,000 requests</span>
              <span className="geo-growth">+7 Growth: 6%</span>
            </div>
            <div className="geo-bar">
              <div className="geo-fill" style={{ width: "6.1%" }}></div>
            </div>
          </div>
        </div>

        <div className="geo-total">
          <strong>Total Global Requests: 345,000</strong>
        </div>
      </div>

      {/* System Monitoring */}
      <div className="section-card">
        <div className="section-header">
          <h2>System Monitoring</h2>
          <p className="section-subtitle">Real-time system health and performance monitoring</p>
        </div>

        <div className="monitoring-chart">
          <div className="chart-header">
            <h3>System Performance Metrics</h3>
            <div className="chart-period">24H</div>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 600 200" className="performance-chart">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,150 Q50,120 100,130 T200,110 T300,120 T400,100 T500,110 T600,100" fill="url(#gradient1)" />
              <path d="M0,150 Q50,120 100,130 T200,110 T300,120 T400,100 T500,110 T600,100" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              
              <path d="M0,170 Q50,155 100,160 T200,150 T300,155 T400,145 T500,150 T600,140" fill="url(#gradient2)" />
              <path d="M0,170 Q50,155 100,160 T200,150 T300,155 T400,145 T500,150 T600,140" stroke="#10B981" strokeWidth="2" fill="none" />
              
              <path d="M0,180 Q50,170 100,175 T200,165 T300,170 T400,160 T500,165 T600,155" fill="url(#gradient3)" />
              <path d="M0,180 Q50,170 100,175 T200,165 T300,170 T400,160 T500,165 T600,155" stroke="#3B82F6" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
