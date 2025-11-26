
import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken, AuthRequest } from "./middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "24h";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }

      // Find user in database
      const user = await db.query.users.findFirst({
        where: eq(users.username, email)
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.username, 
          name: "Admin User" 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.username,
          name: "Admin User"
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during login"
      });
    }
  });

  // Forgot password endpoint
  app.post("/api/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      // TODO: Implement email sending logic
      // For now, just return success
      res.json({
        success: true,
        message: "Password reset link sent to your email"
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  // Reset password endpoint
  app.post("/api/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Token and new password are required"
        });
      }

      // TODO: Implement password reset logic with token verification
      res.json({
        success: true,
        message: "Password reset successful"
      });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  // Check session endpoint
  app.get("/api/check-session", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: "No token provided"
        });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET);

      res.json({
        success: true,
        user: decoded
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
  });

  // Dashboard common data endpoint (protected)
  app.get("/api/dashboard/common", authenticateToken, async (req: AuthRequest, res) => {
    try {
      // TODO: Replace with real database queries
      res.json({
        summaryCards: {
          totalApiCalls: 1200000,
          avgResponseTimeMs: 120,
          currentUsagePercent: 84,
          errorRatePercent: 0.8
        },
        performanceSummary: [
          {
            service: "Authentication",
            responseTimeMs: 89,
            status: "Improved",
            change: "+5.3%",
            previousResponseTimeMs: 94
          },
          {
            service: "User Data",
            responseTimeMs: 156,
            status: "Improved",
            change: "+3.7%",
            previousResponseTimeMs: 162
          },
          {
            service: "Analytics",
            responseTimeMs: 234,
            status: "Improved",
            change: "+2.5%",
            previousResponseTimeMs: 240
          },
          {
            service: "Payments",
            responseTimeMs: 312,
            status: "Slower",
            change: "-5.4%",
            previousResponseTimeMs: 296
          }
        ],
        systemServicesStatus: [
          {
            name: "API Gateway",
            responseTimeMs: 50,
            uptime: "99.9%",
            status: "Healthy",
            lastCheck: "1m ago"
          },
          {
            name: "Database Cluster",
            responseTimeMs: 80,
            uptime: "99.9%",
            status: "Healthy",
            lastCheck: "30s ago"
          },
          {
            name: "Load Balancer",
            responseTimeMs: 42,
            uptime: "99.9%",
            status: "Healthy",
            lastCheck: "30s ago"
          },
          {
            name: "Cache Layer",
            responseTimeMs: 300,
            uptime: "99.5%",
            status: "Warning",
            lastCheck: "1m ago"
          },
          {
            name: "Auth Service",
            responseTimeMs: 600,
            uptime: "99.2%",
            status: "Critical",
            lastCheck: "5m ago"
          }
        ],
        resourceUsage: {
          cpuPercent: 45,
          memoryPercent: 62,
          diskPercent: 78,
          networkPercent: 34,
          overallHealth: "Operational"
        },
        recentIncidents: [
          {
            title: "Cache Layer Latency Spike",
            subtitle: "Increased response times in cache layer",
            status: "warning",
            daysAgo: 3
          },
          {
            title: "Database Connection Pool Full",
            subtitle: "Temporary connection pool exhaustion",
            status: "resolved",
            daysAgo: 7
          },
          {
            title: "API Rate Limit Exceeded",
            subtitle: "Burst rate limit threshold breached",
            status: "info",
            daysAgo: 7
          },
          {
            title: "No Active Incidents",
            subtitle: "All systems are operating normally",
            status: "resolved",
            daysAgo: 0
          }
        ]
      });
    } catch (error) {
      console.error("Dashboard common data error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  // Dashboard API calls over time endpoint (protected)
  app.get("/api/dashboard/api-calls", authenticateToken, async (req: AuthRequest, res) => {
    try {
      // TODO: Replace with real database queries based on query params
      res.json({
        status: "success",
        data: {
          chartTitle: "API Calls Over Time",
          selectedEndpoint: "All Endpoints",
          selectedRange: "Last 30 days",
          points: [
            { date: "2025-10-01", count: 1200 },
            { date: "2025-10-10", count: 1800 },
            { date: "2025-10-20", count: 1500 },
            { date: "2025-11-01", count: 2100 },
            { date: "2025-11-10", count: 1950 },
            { date: "2025-11-20", count: 1700 },
            { date: "2025-11-30", count: 1850 }
          ]
        }
      });
    } catch (error) {
      console.error("Dashboard API calls error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  // Dashboard response time analytics endpoint (protected)
  app.get("/api/dashboard/response-time", authenticateToken, async (req: AuthRequest, res) => {
    try {
      // TODO: Replace with real database queries
      res.json({
        title: "Response Time Analytics",
        filter: "All APIs",
        metrics: [
          {
            api: "Payments",
            color: "red",
            unit: "ms",
            values: [310, 315, 320, 318, 322, 325, 330]
          },
          {
            api: "Analytics",
            color: "orange",
            unit: "ms",
            values: [220, 225, 230, 228, 229, 232, 235]
          },
          {
            api: "User Data",
            color: "green",
            unit: "ms",
            values: [150, 152, 155, 154, 156, 158, 160]
          },
          {
            api: "Authentication",
            color: "blue",
            unit: "ms",
            values: [90, 92, 95, 94, 96, 97, 99]
          }
        ],
        dates: [
          "Oct 01",
          "Oct 10",
          "Oct 20",
          "Nov 01",
          "Nov 10",
          "Nov 20",
          "Nov 30"
        ]
      });
    } catch (error) {
      console.error("Dashboard response time error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
