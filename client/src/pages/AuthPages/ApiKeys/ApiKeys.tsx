
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Key } from "lucide-react";
import "./ApiKeys.scss";

export default function ApiKeys() {
  return (
    <AppLayout
      title="API Keys"
      subtitle="Manage your API keys and access tokens"
    >
      <div className="cls-apikeys-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <Key className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              API Keys management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
