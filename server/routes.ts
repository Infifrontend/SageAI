
import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

      // For now, use hardcoded admin credentials
      // You can later extend this to check database
      if (email === "admin@sage.com" && password === "Infi@123") {
        const token = jwt.sign(
          { email: "admin@sage.com", name: "Admin User" },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRY }
        );

        res.json({
          success: true,
          message: "Login successful",
          token,
          user: {
            email: "admin@sage.com",
            name: "Admin User"
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
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

  // Dashboard data endpoint
  app.get("/api/dashboard", async (req, res) => {
    try {
      // TODO: Fetch real dashboard data from database
      res.json({
        success: true,
        data: {
          totalApiCalls: "1.2M",
          activeUsers: "45.2K",
          revenue: "$128.5K",
          avgResponseTime: "124ms"
        }
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
