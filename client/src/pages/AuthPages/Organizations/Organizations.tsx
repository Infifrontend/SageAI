
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import "./Organizations.scss";

export default function Organizations() {
  return (
    <AppLayout
      title="Organizations"
      subtitle="Manage organizations and their settings"
    >
      <div className="cls-organizations-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <Building2 className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              Organizations management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
