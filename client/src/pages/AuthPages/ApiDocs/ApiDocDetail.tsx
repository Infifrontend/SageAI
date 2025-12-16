
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

// API collections metadata with YAML file paths
const apiCollectionsMetadata: Record<string, { yamlPath?: string }> = {
  "1": {
    yamlPath: "/api-specs/grm-api.yaml" // ClearTrip API (GRM API)
  },
  "2": {
    yamlPath: "/api-specs/sample-api.yaml" // Payment Gateway API
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
          if (!response.ok) {
            throw new Error(`Failed to fetch YAML file: ${response.statusText}`);
          }
          const yamlText = await response.text();
          
          // Check if we received HTML instead of YAML (common issue with static file serving)
          if (yamlText.trim().startsWith('<!DOCTYPE') || yamlText.trim().startsWith('<html')) {
            console.error("Received HTML instead of YAML. File path may be incorrect:", metadata.yamlPath);
            throw new Error(`Failed to load YAML file. The file at ${metadata.yamlPath} could not be found or is not accessible.`);
          }
          
          let parsedYaml: any;
          try {
            parsedYaml = yaml.load(yamlText, { 
              json: true,
              onWarning: (warning) => {
                console.warn("YAML warning:", warning);
              }
            });
          } catch (yamlError: any) {
            console.error("YAML parsing error:", yamlError);
            console.error("YAML content preview:", yamlText.substring(0, 500));
            throw new Error(`Invalid YAML format: ${yamlError.message || 'Unknown error'}`);
          }

          if (!parsedYaml || typeof parsedYaml !== 'object') {
            console.error("Parsed YAML is not an object:", parsedYaml);
            throw new Error("Invalid YAML structure - not a valid object");
          }

          if (!parsedYaml.paths) {
            console.error("YAML structure:", Object.keys(parsedYaml));
            throw new Error("Invalid YAML structure - missing paths");
          }

          // Transform OpenAPI spec to our format
          const endpoints = Object.entries(parsedYaml.paths || {}).flatMap(([path, methods]: [string, any]) => {
            return Object.entries(methods)
              .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase()))
              .map(([method, details]: [string, any]) => {
                const responses: any = {};
                
                // Parse responses with better handling
                Object.entries(details.responses || {}).forEach(([code, responseData]: [string, any]) => {
                  let exampleValue: any = null;
                  
                  // Try to get example from various possible locations
                  if (responseData.content?.["application/json"]?.examples) {
                    const examplesObj = responseData.content["application/json"].examples;
                    const firstExampleKey = Object.keys(examplesObj)[0];
                    if (firstExampleKey && examplesObj[firstExampleKey]?.value) {
                      exampleValue = examplesObj[firstExampleKey].value;
                    }
                  } else if (responseData.content?.["application/json"]?.example) {
                    exampleValue = responseData.content["application/json"].example;
                  } else if (responseData.content?.["application/json"]?.schema?.example) {
                    exampleValue = responseData.content["application/json"].schema.example;
                  } else if (responseData.content?.["application/json"]?.schema) {
                    exampleValue = { schema: "See API specification for schema details" };
                  }
                  
                  responses[code] = {
                    description: responseData.description || `Response ${code}`,
                    example: exampleValue ? JSON.stringify(exampleValue, null, 2) : "{}"
                  };
                });

                // Parse request body if exists
                let requestExample = "{}";
                if (details.requestBody?.content?.["application/json"]?.schema) {
                  const schema = details.requestBody.content["application/json"].schema;
                  if (schema.example) {
                    requestExample = JSON.stringify(schema.example, null, 2);
                  } else if (schema.properties) {
                    requestExample = JSON.stringify({ info: "See schema for request structure" }, null, 2);
                  }
                }

                return {
                  id: details.operationId || `${method}-${path.replace(/\//g, '-')}`,
                  name: details.summary || `${method.toUpperCase()} ${path}`,
                  method: method.toUpperCase(),
                  path: path,
                  description: details.description || details.summary || `${method.toUpperCase()} ${path}`,
                  tags: details.tags || [],
                  responses,
                  requests: {
                    "200": {
                      example: requestExample
                    }
                  }
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
        // No YAML path configured
        console.error("No YAML path configured for this API");
        setApiDoc(null);
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

  if (!apiDoc && !isLoading) {
    return (
      <AppLayout title="API Documentation" subtitle="API document not found">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-red-600 font-semibold">API documentation could not be loaded.</p>
                <p className="text-sm text-gray-600">
                  The YAML specification file may be invalid or missing. Please check the console for detailed error messages.
                </p>
                <Button onClick={() => setLocation("/api-docs")} className="mt-4">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to API Collections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const currentEndpoint = apiDoc.endpoints.find((e : any) => e.id === selectedEndpoint) || apiDoc.endpoints[0];
  const filteredEndpoints = apiDoc.endpoints.filter((endpoint : any) =>
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
                  <h3 className="cls-sidebar-title text-[#fff]">Endpoints</h3>
                  <div className="cls-search-container">
                    <Search className="cls-search-icon right-[12px] left-[unset]" size={16} />
                    <Input
                      type="text"
                      placeholder="Search endpoints..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cls-search-input text-[#000]"
                    />
                  </div>
                </div>
                <div className="cls-endpoints-list">
                  {filteredEndpoints.map((endpoint: any) => (
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
                      <div className="cls-endpoint-description">{currentEndpoint.description}</div>

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
                        <pre className="cls-code-block">
                          <code>{currentEndpoint.requests[selectedResponse]?.example || "{}"}</code>
                        </pre>
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
