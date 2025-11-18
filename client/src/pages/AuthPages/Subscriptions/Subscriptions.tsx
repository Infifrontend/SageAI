
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import "./Subscriptions.scss";

export default function Subscriptions() {
  return (
    <AppLayout
      title="Subscription Plans"
      subtitle="View and manage your subscription plans"
    >
      <div className="cls-subscriptions-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <Package className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              Subscription plans management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
