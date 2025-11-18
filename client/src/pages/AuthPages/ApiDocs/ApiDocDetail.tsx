
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Download,
  Copy,
  CheckCircle2,
} from "lucide-react";
import "./ApiDocDetail.scss";

interface Endpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  responses: {
    code: string;
    description: string;
    schema: {
      type: string;
      properties?: Record<string, { type: string; description?: string }>;
    };
  }[];
}

const mockApiData = {
  "1": {
    name: "GRM API",
    version: "1.0.0",
    status: "active" as const,
    description: "GRM API provides endpoints for authentication, user management, ancillary services, policy...",
    createdBy: "admin@sage.co",
    createdDate: "July 20th, 2024",
    endpoints: [
      {
        id: "ping",
        name: "Ping",
        method: "GET" as const,
        path: "/ping",
        description: "A simple endpoint to check if the API is responsive.",
        responses: [
          {
            code: "200",
            description: "API is up and running.",
            schema: {
              type: "application/json",
              properties: {
                message: { type: "string", description: "Response message" },
              },
            },
          },
        ],
      },
    ],
  },
  "2": {
    name: "Sample API",
    version: "1.0.0",
    status: "inactive" as const,
    description: "A sample API to illustrate OpenAPI concepts.",
    createdBy: "admin@sage.co",
    createdDate: "July 22nd, 2024",
    endpoints: [
      {
        id: "ping",
        name: "Ping",
        method: "GET" as const,
        path: "/ping",
        description: "A simple endpoint to check if the API is responsive.",
        responses: [
          {
            code: "200",
            description: "API is up and running.",
            schema: {
              type: "application/json",
              properties: {
                message: { type: "string", description: "Response message" },
              },
            },
          },
        ],
      },
    ],
  },
};

export default function ApiDocDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("ping");
  const [selectedResponse, setSelectedResponse] = useState("200");
  const [copiedCode, setCopiedCode] = useState(false);

  const apiData = id ? mockApiData[id as keyof typeof mockApiData] : null;

  if (!apiData) {
    return (
      <AppLayout title="API Documentation" subtitle="">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <p>API documentation not found.</p>
              <Button onClick={() => navigate("/api-docs")} className="mt-4">
                <ArrowLeft size={16} />
                Back to API Collections
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const currentEndpoint = apiData.endpoints.find(
    (ep) => ep.id === selectedEndpoint
  );

  const handleCopyCode = () => {
    if (currentEndpoint) {
      const response = currentEndpoint.responses.find(
        (r) => r.code === selectedResponse
      );
      if (response) {
        const codeText = JSON.stringify(
          { message: "pong" },
          null,
          2
        );
        navigator.clipboard.writeText(codeText);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  };

  return (
    <AppLayout
      title="API Documentation"
      subtitle="Explore and interact with the available SAGE APIs."
    >
      <div className="cls-apidoc-detail-container">
        {/* Header Section */}
        <Card className="cls-header-card">
          <CardContent className="cls-header-content">
            <div className="cls-header-top">
              <div className="cls-header-left">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/api-docs")}
                  className="cls-back-btn"
                >
                  <ArrowLeft size={20} />
                </Button>
                <div className="cls-title-section">
                  <div className="cls-title-row">
                    <h1 className="cls-api-title">{apiData.name}</h1>
                    <Badge className="cls-version-badge">
                      v{apiData.version}
                    </Badge>
                    <Badge
                      className={
                        apiData.status === "active"
                          ? "cls-status-badge-active"
                          : "cls-status-badge-inactive"
                      }
                    >
                      {apiData.status}
                    </Badge>
                  </div>
                  <p className="cls-api-description">{apiData.description}</p>
                  <p className="cls-api-meta">
                    Created by {apiData.createdBy} on {apiData.createdDate}
                  </p>
                </div>
              </div>
              <div className="cls-header-actions">
                <Select defaultValue="redoc">
                  <SelectTrigger className="cls-tool-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="redoc">Redoc</SelectItem>
                    <SelectItem value="swagger">Swagger</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="cls-manage-btn">Manage API</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Section */}
        <div className="cls-content-section">
          {/* Sidebar */}
          <Card className="cls-sidebar-card">
            <CardContent className="cls-sidebar-content">
              <div className="cls-search-container">
                <Search className="cls-search-icon" size={16} />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cls-search-input"
                />
              </div>

              <div className="cls-endpoints-list">
                {apiData.endpoints.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className={`cls-endpoint-item ${selectedEndpoint === endpoint.id ? "cls-endpoint-active" : ""}`}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                  >
                    <Badge
                      className={`cls-method-badge cls-method-${endpoint.method.toLowerCase()}`}
                    >
                      {endpoint.method}
                    </Badge>
                    <span className="cls-endpoint-name">{endpoint.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="cls-main-content">
            <Card className="cls-content-card">
              <CardContent className="cls-content-body">
                <div className="cls-api-header">
                  <h2 className="cls-api-name">
                    {apiData.name} ({apiData.version})
                  </h2>
                  <Button variant="outline" className="cls-download-btn">
                    <Download size={16} />
                    Download
                  </Button>
                </div>

                <p className="cls-spec-description">{apiData.description}</p>

                {currentEndpoint && (
                  <>
                    <div className="cls-endpoint-section">
                      <h3 className="cls-section-title">
                        {currentEndpoint.name}
                      </h3>
                      <p className="cls-endpoint-description">
                        {currentEndpoint.description}
                      </p>

                      <div className="cls-responses-section">
                        <h4 className="cls-subsection-title">Responses</h4>
                        <div className="cls-response-item">
                          <div className="cls-response-header">
                            <CheckCircle2
                              size={16}
                              className="cls-success-icon"
                            />
                            <span className="cls-response-code">
                              {currentEndpoint.responses[0].code}
                            </span>
                            <span className="cls-response-description">
                              {currentEndpoint.responses[0].description}
                            </span>
                          </div>

                          <div className="cls-response-schema">
                            <div className="cls-schema-header">
                              <span className="cls-schema-label">
                                RESPONSE SCHEMA:
                              </span>
                              <span className="cls-schema-type">
                                {currentEndpoint.responses[0].schema.type}
                              </span>
                            </div>
                            {currentEndpoint.responses[0].schema.properties && (
                              <div className="cls-schema-properties">
                                {Object.entries(
                                  currentEndpoint.responses[0].schema.properties
                                ).map(([key, value]) => (
                                  <div key={key} className="cls-property-row">
                                    <span className="cls-property-name">
                                      {key}
                                    </span>
                                    <span className="cls-property-type">
                                      {value.type}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Response Panel */}
            <Card className="cls-response-panel">
              <CardContent className="cls-panel-content">
                <div className="cls-panel-header">
                  <div className="cls-endpoint-url">
                    <Badge className="cls-method-badge cls-method-get">
                      {currentEndpoint?.method}
                    </Badge>
                    <span className="cls-endpoint-path">
                      {currentEndpoint?.path}
                    </span>
                  </div>
                </div>

                <div className="cls-response-samples">
                  <div className="cls-samples-header">
                    <span className="cls-samples-label">Response samples</span>
                  </div>
                  <div className="cls-response-tabs">
                    {currentEndpoint?.responses.map((response) => (
                      <button
                        key={response.code}
                        className={`cls-response-tab ${selectedResponse === response.code ? "cls-tab-active" : ""}`}
                        onClick={() => setSelectedResponse(response.code)}
                      >
                        {response.code}
                      </button>
                    ))}
                  </div>

                  <div className="cls-content-type">
                    <span className="cls-content-label">Content type</span>
                    <span className="cls-content-value">application/json</span>
                  </div>

                  <div className="cls-code-block">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyCode}
                      className="cls-copy-btn"
                    >
                      {copiedCode ? "Copied!" : "Copy"}
                    </Button>
                    <pre className="cls-code-content">
                      <code>{`{
  "message": "pong"
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
