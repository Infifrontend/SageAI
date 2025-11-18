
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import "./Billing.scss";

export default function Billing() {
  return (
    <AppLayout
      title="Billing"
      subtitle="Manage your billing and payment methods"
    >
      <div className="cls-billing-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <CreditCard className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              Billing management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
