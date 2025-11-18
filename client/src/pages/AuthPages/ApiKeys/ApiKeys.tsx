
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Key,
  Search,
  Plus,
  MoreVertical,
  Copy,
  Edit,
  Trash2,
  CheckCircle2,
  Code,
  Shield,
  Clock,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./ApiKeys.scss";

interface ApiKey {
  id: string;
  name: string;
  organization: string;
  apiKey: string;
  environment: "Production" | "Development" | "Staging";
  status: "active" | "inactive";
  permissions: string;
  endpoints: number;
  usageToday: number;
  usageLimit: number;
  lastUsed: string;
}

const apiKeysData: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    organization: "TechCorp Solutions",
    apiKey: "sk-prod-abc1...d6p4f8",
    environment: "Production",
    status: "active",
    permissions: "GRM-API",
    endpoints: 50,
    usageToday: 12450,
    usageLimit: 100000,
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "Development API Key",
    organization: "TechCorp Solutions",
    apiKey: "sk-dev-xyz7...4d9a678",
    environment: "Development",
    status: "active",
    permissions: "GRM-API",
    endpoints: 15,
    usageToday: 340,
    usageLimit: 10000,
    lastUsed: "5 minutes ago",
  },
  {
    id: "3",
    name: "Testing API Key",
    organization: "DataFlow Systems",
    apiKey: "sk-test-qwe4...78k1981",
    environment: "Staging",
    status: "inactive",
    permissions: "SAMPLE-API",
    endpoints: 1,
    usageToday: 0,
    usageLimit: 1000,
    lastUsed: "1 day ago",
  },
  {
    id: "4",
    name: "Analytics API Key",
    organization: "Cloudify Inc.",
    apiKey: "sk-analytics...x1612",
    environment: "Production",
    status: "active",
    permissions: "GRM-API",
    endpoints: 7,
    usageToday: 2890,
    usageLimit: 50000,
    lastUsed: "30 minutes ago",
  },
];

export default function ApiKeys() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    environment: "Development" as "Production" | "Development" | "Staging",
    permissions: "",
  });

  // Filter API keys based on search
  const filteredKeys = apiKeysData.filter(
    (key) =>
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.apiKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalKeys = apiKeysData.length;
  const activeKeys = apiKeysData.filter((k) => k.status === "active").length;
  const productionKeys = apiKeysData.filter(
    (k) => k.environment === "Production"
  ).length;
  const developmentKeys = apiKeysData.filter(
    (k) => k.environment === "Development"
  ).length;

  // Pagination
  const totalPages = Math.ceil(filteredKeys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKeys = filteredKeys.slice(startIndex, endIndex);

  const handleCopyKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
  };

  const handleDelete = (id: string) => {
    console.log("Delete API key:", id);
  };

  const handleCreateKey = () => {
    console.log("Create new API key:", formData);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      organization: "",
      environment: "Development",
      permissions: "",
    });
  };

  return (
    <AppLayout
      title="API Keys"
      subtitle="Create, manage, and monitor your API keys"
    >
      <div className="cls-apikeys-page">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total API Keys</p>
                <h3 className="cls-stat-value">{totalKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <Key />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Keys</p>
                <h3 className="cls-stat-value">{activeKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <CheckCircle2 />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Production Keys</p>
                <h3 className="cls-stat-value">{productionKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-red">
                <Shield />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Development Keys</p>
                <h3 className="cls-stat-value">{developmentKeys}</h3>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <Code />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Key Management Section */}
        <Card className="cls-management-card">
          <CardContent className="cls-management-content">
            <div className="cls-management-header">
              <div className="cls-header-left">
                <Key className="cls-header-icon" />
                <h2 className="cls-header-title">API Key Management</h2>
              </div>
              <div className="cls-header-actions">
                <div className="cls-search-container">
                  <Search className="cls-search-icon" />
                  <Input
                    type="text"
                    placeholder="Search API keys..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="cls-new-key-button"
                >
                  <Plus size={16} />
                  New API Key
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="cls-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name & Organization</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Usage Today</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="cls-actions-head"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell>
                        <div className="cls-name-cell">
                          <p className="cls-key-name">{apiKey.name}</p>
                          <p className="cls-organization">
                            {apiKey.organization}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="cls-api-key-cell">
                          <code className="cls-api-key-code">
                            {apiKey.apiKey}
                          </code>
                          <button
                            onClick={() => handleCopyKey(apiKey.apiKey)}
                            className="cls-copy-button"
                            title="Copy API Key"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`cls-env-badge cls-env-${apiKey.environment.toLowerCase()}`}
                        >
                          {apiKey.environment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`cls-status-badge cls-status-${apiKey.status}`}
                        >
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="cls-permissions-cell">
                          <p className="cls-permission-name">
                            {apiKey.permissions}
                          </p>
                          <p className="cls-endpoints-count">
                            {apiKey.endpoints} endpoint(s)
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="cls-usage-cell">
                          <p className="cls-usage-count">
                            {apiKey.usageToday.toLocaleString()}
                          </p>
                          <p className="cls-usage-limit">
                            / {(apiKey.usageLimit / 1000).toFixed(0)}k/hour
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="cls-last-used-cell">
                          <Clock size={14} className="cls-clock-icon" />
                          <span>{apiKey.lastUsed}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cls-actions-button"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cls-menu-item">
                              <Copy size={16} />
                              Copy Key
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cls-menu-item">
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(apiKey.id)}
                              className="cls-delete-item"
                            >
                              <Trash2 size={16} />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredKeys.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          startIndex={startIndex}
          endIndex={endIndex}
        />

        {/* Create API Key Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="cls-create-dialog">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Generate a new API key for your application
              </DialogDescription>
            </DialogHeader>

            <div className="cls-form-grid">
              <div className="cls-form-field">
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., Production API Key"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="cls-form-field">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="e.g., TechCorp Solutions"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                />
              </div>

              <div className="cls-form-field">
                <Label htmlFor="environment">Environment</Label>
                <Select
                  value={formData.environment}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, environment: value })
                  }
                >
                  <SelectTrigger id="environment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="cls-form-field">
                <Label htmlFor="permissions">Permissions</Label>
                <Input
                  id="permissions"
                  placeholder="e.g., GRM-API"
                  value={formData.permissions}
                  onChange={(e) =>
                    setFormData({ ...formData, permissions: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateKey}>Create API Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
