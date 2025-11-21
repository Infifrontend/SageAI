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
    ></AppLayout>
  );
}
