
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import "./ApiDocs.scss";

export default function ApiDocs() {
  return (
    <AppLayout
      title="API Documentation"
      subtitle="Comprehensive API documentation and guides"
    >
      <div className="cls-apidocs-container">
        <Card className="cls-placeholder-card">
          <CardContent className="cls-placeholder-content">
            <FileText className="cls-placeholder-icon" />
            <h2 className="cls-placeholder-title">Feature Coming Soon</h2>
            <p className="cls-placeholder-description">
              API Documentation will be enabled soon. Stay tuned for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
