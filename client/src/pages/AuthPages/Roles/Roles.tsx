
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import "./Roles.scss";

export default function Roles() {
  return (
    <AppLayout
      title="Roles & Privileges"
      subtitle="Manage roles and access privileges"
    >
      <div className="cls-roles-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <UserCheck className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              Roles & Privileges management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
