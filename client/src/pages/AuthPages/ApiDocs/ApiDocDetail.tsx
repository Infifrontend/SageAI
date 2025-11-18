
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import yaml from "js-yaml";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  Copy,
  ExternalLink,
} from "lucide-react";
import "./ApiDocDetail.scss";

// Mock data for API collections with YAML file paths
const apiCollectionsMetadata: Record<string, { yamlPath?: string }> = {
  "1": {
    yamlPath: undefined // GRM API uses mock data
  },
  "2": {
    yamlPath: "/api-specs/simple-api.yaml" // Sample API uses YAML
  }
};

// Mock data for API collections
const apiCollectionsData = {
  "1": {
    id: "1",
    name: "GRM API",
    version: "1.0.0",
    status: "active" as const,
    description: "GRM API provides endpoints for authentication, user management, ancillary services, policy management, and more.",
    baseUrl: "https://api.example.com/v1",
    endpoints: [
      {
        id: "ping",
        name: "Ping",
        method: "GET",
        path: "/ping",
        description: "Simple ping endpoint to check API availability",
        responses: {
          "200": {
            description: "Success",
            example: '{\n  "message": "pong"\n}'
          }
        }
      },
      {
        id: "auth",
        name: "Authentication",
        method: "POST",
        path: "/auth/login",
        description: "Authenticate user and receive access token",
        responses: {
          "200": {
            description: "Success",
            example: '{\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "user": {\n    "id": "123",\n    "email": "user@example.com"\n  }\n}'
          },
          "401": {
            description: "Unauthorized",
            example: '{\n  "error": "Invalid credentials"\n}'
          }
        }
      }
    ]
  }
};

export default function ApiDocDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [selectedResponse, setSelectedResponse] = useState("200");
  const [apiDoc, setApiDoc] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApiDoc = async () => {
      setIsLoading(true);
      const metadata = apiCollectionsMetadata[id as string];
      
      if (metadata?.yamlPath) {
        try {
          const response = await fetch(metadata.yamlPath);
          const yamlText = await response.text();
          const parsedYaml: any = yaml.load(yamlText);
          
          // Transform OpenAPI spec to our format
          const endpoints = Object.entries(parsedYaml.paths || {}).flatMap(([path, methods]: [string, any]) => {
            return Object.entries(methods).map(([method, details]: [string, any]) => {
              const responses: any = {};
              Object.entries(details.responses || {}).forEach(([code, responseData]: [string, any]) => {
                responses[code] = {
                  description: responseData.description || "",
                  example: JSON.stringify(
                    responseData.content?.["application/json"]?.examples?.foo?.value || {},
                    null,
                    2
                  )
                };
              });
              
              return {
                id: details.operationId || `${method}-${path}`,
                name: details.summary || `${method.toUpperCase()} ${path}`,
                method: method.toUpperCase(),
                path: path,
                description: details.summary || details.description || "",
                responses
              };
            });
          });
          
          setApiDoc({
            id: id,
            name: parsedYaml.info?.title || "API Documentation",
            version: parsedYaml.info?.version || "1.0.0",
            status: "active",
            description: parsedYaml.info?.description || parsedYaml.info?.title || "",
            baseUrl: parsedYaml.servers?.[0]?.url || "https://api.example.com",
            endpoints
          });
          
          if (endpoints.length > 0) {
            setSelectedEndpoint(endpoints[0].id);
          }
        } catch (error) {
          console.error("Error loading YAML:", error);
          setApiDoc(null);
        }
      } else {
        // Use mock data
        const mockData = apiCollectionsData[id as keyof typeof apiCollectionsData];
        setApiDoc(mockData);
        if (mockData?.endpoints?.length > 0) {
          setSelectedEndpoint(mockData.endpoints[0].id);
        }
      }
      
      setIsLoading(false);
    };
    
    loadApiDoc();
  }, [id]);

  if (isLoading) {
    return (
      <AppLayout title="API Documentation" subtitle="Loading...">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <p>Loading API documentation...</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  if (!apiDoc) {
    return (
      <AppLayout title="API Documentation" subtitle="API document not found">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <p>API documentation not found.</p>
              <Button onClick={() => setLocation("/api-docs")} className="mt-4">
                <ArrowLeft size={16} />
                Back to API Collections
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const currentEndpoint = apiDoc.endpoints.find(e => e.id === selectedEndpoint) || apiDoc.endpoints[0];
  const filteredEndpoints = apiDoc.endpoints.filter(endpoint =>
    endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout
      title={apiDoc.name}
      subtitle={apiDoc.description}
    >
      <div className="cls-apidoc-detail-container">
        <Card className="cls-detail-card">
          <CardContent className="cls-detail-content pt-6">
            {/* Header */}
            <div className="cls-detail-header">
              <div className="cls-header-left">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocation("/api-docs")}
                  className="cls-back-btn"
                >
                  <ArrowLeft size={20} />
                </Button>
                <div className="cls-title-section">
                  <h2 className="cls-doc-title">{apiDoc.name}</h2>
                  <div className="cls-meta-info">
                    <span className="cls-version">Version {apiDoc.version}</span>
                    <Badge
                      className={
                        apiDoc.status === "active"
                          ? "cls-status-badge-active"
                          : "cls-status-badge-inactive"
                      }
                    >
                      {apiDoc.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="cls-header-actions">
                <Button variant="outline" size="sm">
                  <ExternalLink size={16} />
                  Export
                </Button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="cls-content-grid">
              {/* Sidebar - Endpoints List */}
              <div className="cls-sidebar">
                <div className="cls-sidebar-header">
                  <h3 className="cls-sidebar-title">Endpoints</h3>
                  <div className="cls-search-container">
                    <Search className="cls-search-icon" size={16} />
                    <Input
                      type="text"
                      placeholder="Search endpoints..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cls-search-input"
                    />
                  </div>
                </div>
                <div className="cls-endpoints-list">
                  {filteredEndpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => {
                        setSelectedEndpoint(endpoint.id);
                        setSelectedResponse("200");
                      }}
                      className={`cls-endpoint-item ${selectedEndpoint === endpoint.id ? "cls-active" : ""}`}
                    >
                      <Badge className={`cls-method-badge cls-method-${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </Badge>
                      <div className="cls-endpoint-info">
                        <span className="cls-endpoint-name">{endpoint.name}</span>
                        <span className="cls-endpoint-path">{endpoint.path}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content - Endpoint Details */}
              <div className="cls-main-content">
                <Tabs defaultValue="overview" className="cls-detail-tabs">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="cls-tab-content">
                    <div className="cls-overview-section">
                      <div className="cls-endpoint-header">
                        <Badge className={`cls-method-badge-lg cls-method-${currentEndpoint.method.toLowerCase()}`}>
                          {currentEndpoint.method}
                        </Badge>
                        <code className="cls-endpoint-path-lg">{currentEndpoint.path}</code>
                        <Button variant="ghost" size="icon" className="cls-copy-btn">
                          <Copy size={16} />
                        </Button>
                      </div>
                      <p className="cls-endpoint-description">{currentEndpoint.description}</p>
                      
                      <div className="cls-base-url">
                        <h4 className="cls-section-subtitle">Base URL</h4>
                        <code className="cls-code-block">{apiDoc.baseUrl}</code>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="request" className="cls-tab-content">
                    <div className="cls-request-section">
                      <h4 className="cls-section-subtitle">Request Details</h4>
                      <div className="cls-request-info">
                        <div className="cls-info-row">
                          <span className="cls-info-label">Method:</span>
                          <Badge className={`cls-method-badge cls-method-${currentEndpoint.method.toLowerCase()}`}>
                            {currentEndpoint.method}
                          </Badge>
                        </div>
                        <div className="cls-info-row">
                          <span className="cls-info-label">Endpoint:</span>
                          <code>{currentEndpoint.path}</code>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="response" className="cls-tab-content">
                    <div className="cls-response-section">
                      <div className="cls-response-header">
                        <h4 className="cls-section-subtitle">Responses</h4>
                        <Select
                          value={selectedResponse}
                          onValueChange={setSelectedResponse}
                        >
                          <SelectTrigger className="cls-response-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(currentEndpoint.responses).map((code) => (
                              <SelectItem key={code} value={code}>
                                {code} - {currentEndpoint.responses[code].description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="cls-response-body">
                        <div className="cls-code-header">
                          <span className="cls-code-label">Response Body</span>
                          <Button variant="ghost" size="icon" className="cls-copy-btn">
                            <Copy size={14} />
                          </Button>
                        </div>
                        <pre className="cls-code-block">
                          <code>{currentEndpoint.responses[selectedResponse]?.example || "{}"}</code>
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
