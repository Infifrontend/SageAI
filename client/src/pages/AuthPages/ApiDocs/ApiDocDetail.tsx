
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import yaml from "js-yaml";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle2,
} from "lucide-react";
import "./ApiDocDetail.scss";

// API collections metadata with YAML file paths
const apiCollectionsMetadata: Record<string, { yamlPath?: string }> = {
  "1": {
    yamlPath: "/api-specs/grm-api.yaml"
  },
  "2": {
    yamlPath: "/api-specs/sample-api.yaml"
  }
};

export default function ApiDocDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [apiDoc, setApiDoc] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string>("");

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
                
                Object.entries(details.responses || {}).forEach(([code, responseData]: [string, any]) => {
                  let exampleValue: any = null;
                  
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
                  }
                  
                  responses[code] = {
                    description: responseData.description || `Response ${code}`,
                    example: exampleValue ? JSON.stringify(exampleValue, null, 2) : null
                  };
                });

                let requestExample = null;
                if (details.requestBody?.content?.["application/json"]?.schema) {
                  const schema = details.requestBody.content["application/json"].schema;
                  if (schema.example) {
                    requestExample = JSON.stringify(schema.example, null, 2);
                  }
                }

                // Extract parameters
                const parameters = (details.parameters || []).map((param: any) => ({
                  name: param.name,
                  in: param.in,
                  required: param.required || false,
                  type: param.schema?.type || 'string',
                  description: param.description || ''
                }));

                return {
                  id: details.operationId || `${method}-${path.replace(/\//g, '-')}`,
                  name: details.summary || `${method.toUpperCase()} ${path}`,
                  method: method.toUpperCase(),
                  path: path,
                  description: details.description || details.summary || '',
                  tags: details.tags || [],
                  parameters,
                  requestBody: requestExample,
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
        console.error("No YAML path configured for this API");
        setApiDoc(null);
      }

      setIsLoading(false);
    };

    loadApiDoc();
  }, [id]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

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

  const currentEndpoint = apiDoc.endpoints.find((e: any) => e.id === selectedEndpoint) || apiDoc.endpoints[0];
  const filteredEndpoints = apiDoc.endpoints.filter((endpoint: any) =>
    endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title={apiDoc.name} subtitle={apiDoc.description}>
      <div className="cls-apidoc-detail-container">
        {/* Header Section */}
        <div className="cls-doc-header">
          <div className="cls-doc-header-top">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/api-docs")}
              className="cls-back-button"
            >
              <ArrowLeft size={16} />
              Back to Collections
            </Button>
            <Button variant="outline" size="sm" className="cls-export-button">
              <ExternalLink size={16} />
              Export
            </Button>
          </div>
          
          <div className="cls-doc-header-content">
            <div className="cls-doc-title-section">
              <h1 className="cls-doc-main-title">{apiDoc.name}</h1>
              <div className="cls-doc-metadata">
                <Badge className="cls-version-badge">Version {apiDoc.version}</Badge>
                <Badge className="cls-status-badge-active">{apiDoc.status}</Badge>
              </div>
            </div>
            <p className="cls-doc-description">{apiDoc.description}</p>
            
            <div className="cls-base-url-section">
              <span className="cls-base-url-label">Base URL:</span>
              <code className="cls-base-url-code">{apiDoc.baseUrl}</code>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="cls-doc-content-grid">
          {/* Left Sidebar - Endpoints Navigation */}
          <div className="cls-endpoints-sidebar">
            <div className="cls-sidebar-sticky">
              <div className="cls-sidebar-header">
                <h3 className="cls-sidebar-title">Endpoints</h3>
                <div className="cls-search-wrapper">
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
              
              <div className="cls-endpoints-nav">
                {filteredEndpoints.map((endpoint: any) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                    className={`cls-endpoint-nav-item ${selectedEndpoint === endpoint.id ? 'cls-active' : ''}`}
                  >
                    <Badge className={`cls-method-badge cls-method-${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </Badge>
                    <div className="cls-endpoint-nav-info">
                      <span className="cls-endpoint-nav-name">{endpoint.name}</span>
                      <span className="cls-endpoint-nav-path">{endpoint.path}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Endpoint Details */}
          <div className="cls-endpoint-details">
            <div className="cls-endpoint-header-section">
              <div className="cls-endpoint-title-row">
                <Badge className={`cls-method-badge-large cls-method-${currentEndpoint.method.toLowerCase()}`}>
                  {currentEndpoint.method}
                </Badge>
                <h2 className="cls-endpoint-title">{currentEndpoint.name}</h2>
              </div>
              
              <div className="cls-endpoint-path-row">
                <code className="cls-endpoint-path-code">{currentEndpoint.path}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cls-copy-icon-btn"
                  onClick={() => handleCopyCode(currentEndpoint.path, 'path')}
                >
                  {copiedCode === 'path' ? <CheckCircle2 size={16} className="text-green-600" /> : <Copy size={16} />}
                </Button>
              </div>
              
              {currentEndpoint.description && (
                <p className="cls-endpoint-description">{currentEndpoint.description}</p>
              )}
            </div>

            <Tabs defaultValue="overview" className="cls-endpoint-tabs">
              <TabsList className="cls-tabs-list">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="request">Request Body</TabsTrigger>
                <TabsTrigger value="response">Responses</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="cls-tab-panel">
                <div className="cls-overview-content">
                  <div className="cls-info-section">
                    <h3 className="cls-section-heading">Endpoint Information</h3>
                    <div className="cls-info-grid">
                      <div className="cls-info-item">
                        <span className="cls-info-label">Method:</span>
                        <Badge className={`cls-method-badge cls-method-${currentEndpoint.method.toLowerCase()}`}>
                          {currentEndpoint.method}
                        </Badge>
                      </div>
                      <div className="cls-info-item">
                        <span className="cls-info-label">Path:</span>
                        <code className="cls-info-code">{currentEndpoint.path}</code>
                      </div>
                      <div className="cls-info-item">
                        <span className="cls-info-label">Base URL:</span>
                        <code className="cls-info-code">{apiDoc.baseUrl}</code>
                      </div>
                    </div>
                  </div>

                  {currentEndpoint.tags && currentEndpoint.tags.length > 0 && (
                    <div className="cls-info-section">
                      <h3 className="cls-section-heading">Tags</h3>
                      <div className="cls-tags-list">
                        {currentEndpoint.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="cls-tag-badge">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="parameters" className="cls-tab-panel">
                <div className="cls-parameters-content">
                  <h3 className="cls-section-heading">Parameters</h3>
                  {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 ? (
                    <div className="cls-parameters-table">
                      <table className="cls-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEndpoint.parameters.map((param: any, index: number) => (
                            <tr key={index}>
                              <td><code className="cls-param-name">{param.name}</code></td>
                              <td><Badge variant="outline" className="cls-param-in">{param.in}</Badge></td>
                              <td><span className="cls-param-type">{param.type}</span></td>
                              <td>
                                {param.required ? (
                                  <Badge className="cls-required-badge">Required</Badge>
                                ) : (
                                  <Badge variant="outline" className="cls-optional-badge">Optional</Badge>
                                )}
                              </td>
                              <td className="cls-param-desc">{param.description || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="cls-no-data">No parameters defined for this endpoint.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="request" className="cls-tab-panel">
                <div className="cls-request-content">
                  <h3 className="cls-section-heading">Request Body</h3>
                  {currentEndpoint.requestBody ? (
                    <div className="cls-code-section">
                      <div className="cls-code-header">
                        <span className="cls-code-label">JSON</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cls-copy-code-btn"
                          onClick={() => handleCopyCode(currentEndpoint.requestBody, 'request')}
                        >
                          {copiedCode === 'request' ? (
                            <>
                              <CheckCircle2 size={14} className="mr-1 text-green-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} className="mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="cls-code-block">
                        <code>{currentEndpoint.requestBody}</code>
                      </pre>
                    </div>
                  ) : (
                    <p className="cls-no-data">No request body required for this endpoint.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="response" className="cls-tab-panel">
                <div className="cls-response-content">
                  <h3 className="cls-section-heading">Response Codes</h3>
                  {Object.entries(currentEndpoint.responses).map(([code, response]: [string, any]) => (
                    <div key={code} className="cls-response-item">
                      <div className="cls-response-header">
                        <Badge className={`cls-status-code cls-status-${code.startsWith('2') ? 'success' : code.startsWith('4') ? 'error' : 'default'}`}>
                          {code}
                        </Badge>
                        <span className="cls-response-desc">{response.description}</span>
                      </div>
                      {response.example && (
                        <div className="cls-code-section">
                          <div className="cls-code-header">
                            <span className="cls-code-label">Response Example</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cls-copy-code-btn"
                              onClick={() => handleCopyCode(response.example, `response-${code}`)}
                            >
                              {copiedCode === `response-${code}` ? (
                                <>
                                  <CheckCircle2 size={14} className="mr-1 text-green-600" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={14} className="mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <pre className="cls-code-block">
                            <code>{response.example}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
