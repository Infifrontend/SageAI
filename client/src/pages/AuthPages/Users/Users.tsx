
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import "./Users.scss";

export default function UsersPage() {
  return (
    <AppLayout
      title="Users"
      subtitle="Manage users and their permissions"
    >
      <div className="cls-users-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <Users className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              User management will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
