import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Search,
  LayoutGrid,
  List,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  CheckCircle2,
  Users,
  TrendingUp,
  Check,
} from "lucide-react";
import "./Subscriptions.scss";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | string;
  apiCalls: number | string;
  overage: string;
  features: string[];
  status: "Active" | "Inactive";
  subscribers: number;
  icon: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Starter",
    price: 20.0,
    apiCalls: 25000,
    overage: "$0.10/call",
    features: [
      "Basic SAGE API access",
      "Email support",
      "Standard rate limiting",
      "Basic group engagement analytics",
      "Community forums support",
      "API documentation",
    ],
    status: "Active",
    subscribers: 0,
    icon: "star",
  },
  {
    id: "2",
    name: "Professional",
    price: 65.0,
    apiCalls: 100000,
    overage: "$0.08/call",
    features: [
      "Advanced SAGE API features",
      "Priority support",
      "Enhanced rate limiting",
      "Advanced group engagement analytics",
      "Custom group engagement tools",
      "API webhooks & integrations",
      "Real-time engagement tracking",
    ],
    status: "Active",
    subscribers: 1,
    icon: "award",
  },
  {
    id: "3",
    name: "Enterprise",
    price: 200.0,
    apiCalls: 500000,
    overage: "$0.05/call",
    features: [
      "Full SAGE API access",
      "24/7 phone support",
      "Custom rate limiting",
      "Enterprise group management",
      "White-label SAGE solutions",
      "SLA guarantee (99.9% uptime)",
      "Dedicated account manager",
      "Advanced security features",
    ],
    status: "Active",
    subscribers: 2,
    icon: "building",
  },
  {
    id: "4",
    name: "Custom/On-Premise",
    price: "Custom",
    apiCalls: "Unlimited",
    overage: "N/A",
    features: [
      "Unlimited SAGE API access",
      "On-premise SAGE deployment",
      "Custom SLA agreements",
      "Dedicated SAGE infrastructure",
      "Custom group engagement features",
      "Advanced security & compliance",
      "Training & onboarding support",
      "Custom development support",
    ],
    status: "Inactive",
    subscribers: 0,
    icon: "server",
  },
];

export default function Subscriptions() {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPlans = subscriptionPlans.filter((plan) => {
    const matchesSearch = plan.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || plan.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPlans = subscriptionPlans.length;
  const activePlans = subscriptionPlans.filter(
    (p) => p.status === "Active",
  ).length;
  const totalSubscribers = subscriptionPlans.reduce(
    (sum, p) => sum + p.subscribers,
    0,
  );
  const mostPopularPlan = subscriptionPlans.reduce((prev, current) =>
    prev.subscribers > current.subscribers ? prev : current,
  );

  const handleEdit = (planId: string) => {
    console.log("Edit plan:", planId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (planId: string) => {
    console.log("Delete plan:", planId);
    // TODO: Implement delete functionality
  };

  return (
    <AppLayout
      title="Subscription Plans"
      subtitle="Manage your SAGE subscription plans and features"
    >
      <div className="cls-subscriptions-container">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Plans</p>
                <h3 className="cls-stat-value">{totalPlans}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +0 from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-purple">
                <Package size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Plans</p>
                <h3 className="cls-stat-value">{activePlans}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +1 from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-green">
                <CheckCircle2 size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Subscribers</p>
                <h3 className="cls-stat-value">{totalSubscribers}</h3>
                <p className="cls-stat-change cls-positive">
                  <TrendingUp size={14} /> +15% from last month
                </p>
              </div>
              <div className="cls-stat-icon cls-purple-light">
                <Users size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card cls-popular">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Most Popular Plan</p>
                <h3 className="cls-stat-value">{mostPopularPlan.name}</h3>
                <p className="cls-stat-subscribers">
                  {mostPopularPlan.subscribers} subscribers
                </p>
              </div>
              <div className="cls-stat-icon cls-gold">
                <Star size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="cls-filters-section">
          <div className="cls-search-container">
            <Search
              className="cls-search-icon"
              size={18}
              onClick={() => {
                console.log(searchQuery);
              }}
            />
            <Input
              placeholder="Search by plan name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cls-search-input"
            />
          </div>

          <div className="cls-actions-container">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="cls-filter-select">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="cls-view-toggle">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="cls-view-button"
              >
                <LayoutGrid size={16} />
                Card View
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="cls-view-button"
              >
                <List size={16} />
                List View
              </Button>
            </div>

            <Button className="cls-new-plan-button">
              <Plus size={16} />
              New Plan
            </Button>
          </div>
        </div>

        {/* Card View */}
        {viewMode === "card" && (
          <div className="cls-plans-grid">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="cls-plan-card">
                <CardContent className="cls-plan-content">
                  <div className="cls-plan-header">
                    <div className="cls-plan-title-row">
                      <div className="cls-plan-icon">
                        {plan.icon === "star" && <Star size={20} />}
                        {plan.icon === "award" && <Package size={20} />}
                        {plan.icon === "building" && <Package size={20} />}
                        {plan.icon === "server" && <Package size={20} />}
                      </div>
                      <h3 className="cls-plan-name">{plan.name}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cls-menu-button"
                        >
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(plan.id)}>
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(plan.id)}
                          className="cls-delete-item"
                        >
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="cls-plan-pricing">
                    <h2 className="cls-plan-price">
                      {typeof plan.price === "number"
                        ? `$${plan.price.toFixed(2)}`
                        : plan.price}
                    </h2>
                    <p className="cls-plan-period">
                      {typeof plan.price === "number" ? "/month" : ""}
                    </p>
                  </div>

                  <div className="cls-plan-api">
                    <p className="cls-api-calls">
                      {typeof plan.apiCalls === "number"
                        ? `${plan.apiCalls.toLocaleString()} SAGE API calls`
                        : `${plan.apiCalls} SAGE API calls`}
                    </p>
                  </div>

                  <div className="cls-plan-overage">
                    <p className="cls-overage-text">
                      Overage:{" "}
                      <span className="cls-overage-price">{plan.overage}</span>
                    </p>
                  </div>

                  <div className="cls-plan-features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="cls-feature-item">
                        <Check size={16} className="cls-feature-check" />
                        <span className="cls-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="cls-plan-footer">
                    <Badge
                      className={
                        plan.status === "Active"
                          ? "cls-badge-active"
                          : "cls-badge-inactive"
                      }
                    >
                      {plan.status}
                    </Badge>
                    <p className="cls-subscribers">
                      {plan.subscribers} subscribers
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <Card className="cls-table-card">
            <CardContent className="cls-table-content">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No.</TableHead>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>API Calls</TableHead>
                    <TableHead>Overage</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Subscribers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="cls-actions-head"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan, index) => (
                    <TableRow key={plan.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="cls-plan-name-cell">
                        {plan.name}
                      </TableCell>
                      <TableCell>
                        {typeof plan.price === "number"
                          ? `$${plan.price.toFixed(2)}/month`
                          : plan.price}
                      </TableCell>
                      <TableCell>
                        {typeof plan.apiCalls === "number"
                          ? plan.apiCalls.toLocaleString()
                          : plan.apiCalls}
                      </TableCell>
                      <TableCell>{plan.overage}</TableCell>
                      <TableCell>{plan.features.length} features</TableCell>
                      <TableCell>{plan.subscribers}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            plan.status === "Active"
                              ? "cls-badge-active"
                              : "cls-badge-inactive"
                          }
                        >
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cls-menu-button"
                            >
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(plan.id)}
                            >
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(plan.id)}
                              className="cls-delete-item"
                            >
                              <Trash2 size={16} />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
