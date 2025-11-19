
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Download,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Info,
} from "lucide-react";
import "./Billing.scss";

interface Invoice {
  id: number;
  invoiceId: string;
  billingDate: string;
  paidDate: string;
  paymentMethod: string;
  amount: number;
  status: string;
}

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceId: "SAGE-INV-001",
    billingDate: "2024-12-01",
    paidDate: "2024-12-01",
    paymentMethod: "Visa **** 4532",
    amount: 20000.0,
    status: "Paid",
  },
  {
    id: 2,
    invoiceId: "SAGE-INV-002",
    billingDate: "2024-11-01",
    paidDate: "2024-11-02",
    paymentMethod: "Visa **** 4532",
    amount: 19150.0,
    status: "Paid",
  },
  {
    id: 3,
    invoiceId: "SAGE-INV-003",
    billingDate: "2024-10-01",
    paidDate: "2024-10-01",
    paymentMethod: "Visa **** 4532",
    amount: 20100.0,
    status: "Paid",
  },
  {
    id: 4,
    invoiceId: "SAGE-INV-004",
    billingDate: "2024-09-01",
    paidDate: "2024-09-03",
    paymentMethod: "Visa **** 4532",
    amount: 22750.0,
    status: "Paid",
  },
  {
    id: 5,
    invoiceId: "SAGE-INV-005",
    billingDate: "2024-08-01",
    paidDate: "2024-08-01",
    paymentMethod: "Visa **** 4532",
    amount: 19610.0,
    status: "Paid",
  },
];

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState("Enterprise");

  const currentPlan = {
    name: "SAGE Enterprise",
    price: 20000.0,
    apiCalls: 500000,
    used: 420000,
    overage: "$0.05/call",
    percentage: 84,
    billingDate: "August 1st, 2025",
    estimatedAmount: "$20,000.00",
    paymentMethod: "Visa **** 4532",
    overageStatus: "$0.00/call",
  };

  const plans = [
    {
      name: "Starter",
      price: "$2,000.00",
      priceValue: 2000,
      apiCalls: "25,000 SAGE API calls",
      overage: "Overage: $0.10/call",
      features: [
        "Basic API access",
        "Email support",
        "Standard rate limiting",
        "Basic group engagement analytics",
        "Community forum access",
        "API documentation",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$6,500.00",
      priceValue: 6500,
      apiCalls: "100,000 SAGE API calls",
      overage: "Overage: $0.08/call",
      features: [
        "Advanced SAGE API features",
        "Priority support",
        "Enhanced rate limiting",
        "Advanced group engagement analytics",
        "Custom group configurations",
        "API webhooks & integrations",
        "Real-time usage monitoring",
      ],
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "$20,000.00",
      priceValue: 20000,
      apiCalls: "500,000 SAGE API calls",
      overage: "Overage: $0.05/call",
      features: [
        "Full SAGE API access",
        "24/7 phone support",
        "Custom rate limiting",
        "Enterprise group management",
        "White-label SAGE solutions",
        "Advanced security features",
        "Dedicated account manager",
        "Enterprise security features",
      ],
      highlighted: true,
    },
    {
      name: "Custom/On-Premise",
      price: "Custom Quote",
      priceValue: 0,
      apiCalls: "Unlimited SAGE API calls",
      overage: "",
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
      highlighted: false,
    },
  ];

  return (
    <AppLayout
      title="SAGE Billing Overview"
      subtitle="Manage your billing, API subscription, usage, and payment methods"
    >
      <div className="cls-billing-container">
        {/* High Usage Alert */}
        <div className="cls-alert-banner">
          <div className="cls-alert-content">
            <AlertTriangle className="cls-alert-icon" />
            <div className="cls-alert-text">
              <strong>High SAGE API Usage Alert</strong>
              <p>
                You've used 84% of your monthly SAGE API calls. Additional
                calls will be charged at $0.05/call.
              </p>
            </div>
          </div>
          <Button variant="outline" className="cls-alert-button">
            Upgrade Plan
          </Button>
        </div>

        {/* API Usage Insights */}
        <div className="cls-insights-section">
          <h2 className="cls-section-title">SAGE API Usage Insights</h2>
          <p className="cls-section-subtitle">
            Track your group engagement API performance
          </p>

          <div className="cls-stats-grid">
            <Card className="cls-stat-card cls-stat-primary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">
                  {currentPlan.used.toLocaleString()}
                </div>
                <div className="cls-stat-label">SAGE API Calls This Month</div>
              </CardContent>
            </Card>

            <Card className="cls-stat-card cls-stat-secondary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">14,000</div>
                <div className="cls-stat-label">Daily Average Calls</div>
              </CardContent>
            </Card>

            <Card className="cls-stat-card cls-stat-tertiary">
              <CardContent className="cls-stat-content">
                <div className="cls-stat-value">{currentPlan.percentage}%</div>
                <div className="cls-stat-label">Plan Utilization</div>
              </CardContent>
            </Card>
          </div>

          <div className="cls-performance-banner">
            <TrendingUp className="cls-performance-icon" />
            <div className="cls-performance-text">
              <strong>Group Engagement Performance</strong>
              <p>
                Your SAGE API is enabling seamless group interactions with 84%
                efficiency
              </p>
            </div>
          </div>
        </div>

        {/* Current Plan & Next Billing */}
        <div className="cls-plan-billing-grid">
          <Card className="cls-current-plan-card">
            <CardContent className="cls-plan-content">
              <div className="cls-plan-header">
                <h3 className="cls-plan-title">Current SAGE Plan</h3>
                <Button variant="outline" size="sm">
                  Modify
                </Button>
              </div>

              <div className="cls-plan-name">{currentPlan.name}</div>
              <div className="cls-plan-price">
                ${currentPlan.price.toLocaleString()}/month
              </div>

              <div className="cls-plan-details">
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Calls This Month</span>
                  <span className="cls-detail-value">
                    {currentPlan.used.toLocaleString()} calls
                  </span>
                </div>
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Remaining</span>
                  <span className="cls-detail-value">
                    {(currentPlan.apiCalls - currentPlan.used).toLocaleString()}{" "}
                    calls
                  </span>
                </div>
                <div className="cls-detail-row">
                  <span className="cls-detail-label">Overage Rate</span>
                  <span className="cls-detail-value cls-overage-rate">
                    {currentPlan.overageStatus}
                  </span>
                </div>
              </div>

              <div className="cls-usage-section">
                <div className="cls-usage-header">
                  <span>Usage</span>
                  <span className="cls-usage-percent">
                    {currentPlan.percentage}%
                  </span>
                </div>
                <Progress
                  value={currentPlan.percentage}
                  className="cls-usage-progress"
                />
              </div>

              <div className="cls-plan-costs">
                <div className="cls-cost-row">
                  <span>Base Monthly Cost:</span>
                  <span>${currentPlan.price.toLocaleString()}</span>
                </div>
                <div className="cls-cost-row cls-cost-total">
                  <span>Total Monthly Cost:</span>
                  <span>${currentPlan.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cls-next-billing-card">
            <CardContent className="cls-billing-content">
              <h3 className="cls-billing-title">Next SAGE Billing</h3>

              <div className="cls-billing-date-label">Next billing date</div>
              <div className="cls-billing-date">{currentPlan.billingDate}</div>

              <div className="cls-billing-details">
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Estimated Amount</span>
                  <span className="cls-billing-value">
                    {currentPlan.estimatedAmount}
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Payment Method</span>
                  <span className="cls-billing-value">
                    {currentPlan.paymentMethod}
                    <Button variant="ghost" size="sm" className="cls-default-btn">
                      Default
                    </Button>
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Estimated Amount</span>
                  <span className="cls-billing-value cls-billing-highlight">
                    {currentPlan.estimatedAmount}
                  </span>
                </div>
                <div className="cls-billing-row">
                  <span className="cls-billing-label">Current Overage Status</span>
                  <span className="cls-billing-value cls-overage-status">
                    {currentPlan.overageStatus}
                  </span>
                </div>
              </div>

              <div className="cls-billing-actions">
                <Button variant="outline" className="cls-billing-action-btn">
                  <CreditCard size={16} />
                  Update Payment Method
                </Button>
                <Button variant="outline" className="cls-billing-action-btn">
                  <Download size={16} />
                  View SAGE Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overage Rate Comparison */}
        <Card className="cls-overage-card">
          <CardContent className="cls-overage-content">
            <div className="cls-overage-header">
              <h3 className="cls-overage-title">Overage Rate Comparison</h3>
              <p className="cls-overage-subtitle">
                Compare average charges when you exceed your monthly limit
              </p>
            </div>

            <div className="cls-overage-grid">
              <div className="cls-overage-plan cls-overage-starter">
                <div className="cls-overage-plan-name">SAGE Starter</div>
                <div className="cls-overage-plan-rate">$0.10</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 25,000 SAGE API calls
                </div>
              </div>

              <div className="cls-overage-plan cls-overage-professional">
                <div className="cls-overage-plan-name">SAGE Professional</div>
                <div className="cls-overage-plan-rate">$0.08</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 100,000 SAGE API calls
                </div>
              </div>

              <div className="cls-overage-plan cls-overage-enterprise">
                <div className="cls-overage-plan-name">SAGE Enterprise</div>
                <div className="cls-overage-plan-rate">$0.05</div>
                <div className="cls-overage-plan-label">
                  Cost per extra call
                </div>
                <div className="cls-overage-plan-sublabel">
                  After 500,000 SAGE API calls
                </div>
              </div>
            </div>

            <div className="cls-overage-note">
              <Info size={16} />
              <p>
                <strong>Cost Savings Tip:</strong> Higher plans have lower
                overage rates. If you consistently exceed your limit, upgrading
                to a higher plan can save you money on overage charges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="cls-plans-section">
          <h2 className="cls-section-title">Available SAGE Plans</h2>
          <p className="cls-section-subtitle">
            Compare all SAGE tiers that best fit your group engagement API needs
          </p>

          <div className="cls-plans-grid">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`cls-plan-card ${
                  plan.highlighted ? "cls-plan-highlighted" : ""
                } ${selectedPlan === plan.name ? "cls-plan-selected" : ""}`}
              >
                <CardContent className="cls-plan-card-content">
                  {plan.highlighted && (
                    <div className="cls-current-plan-badge">
                      <CheckCircle2 size={14} />
                      Current Plan
                    </div>
                  )}

                  <div className="cls-plan-card-header">
                    <div className="cls-plan-card-name">{plan.name}</div>
                    <div className="cls-plan-card-price">{plan.price}</div>
                    {plan.priceValue > 0 && (
                      <div className="cls-plan-card-period">per month</div>
                    )}
                  </div>

                  <div className="cls-plan-card-calls">{plan.apiCalls}</div>
                  {plan.overage && (
                    <div className="cls-plan-card-overage">{plan.overage}</div>
                  )}

                  <div className="cls-plan-card-features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="cls-feature-item">
                        <CheckCircle2 size={16} className="cls-feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="cls-plan-select-btn"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.name === "Custom/On-Premise"
                      ? "Contact SAGE Sales"
                      : "Switch Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <Card className="cls-invoices-card">
          <CardContent className="cls-invoices-content">
            <div className="cls-invoices-header">
              <h3 className="cls-invoices-title">Recent SAGE Invoices</h3>
              <Button variant="outline" size="sm">
                <Download size={16} />
                Export All Invoices
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Billing Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell className="cls-invoice-id">
                      {invoice.invoiceId}
                    </TableCell>
                    <TableCell>{invoice.billingDate}</TableCell>
                    <TableCell>{invoice.paidDate}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="cls-invoice-amount">
                      ${invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className="cls-badge-paid">{invoice.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                        Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
