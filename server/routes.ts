
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check credentials
      if (email === "admin@sage.com" && password === "Infi@123") {
        res.json({
          success: true,
          message: "Login successful",
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
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
