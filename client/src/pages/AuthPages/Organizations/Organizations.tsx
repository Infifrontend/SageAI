
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TablePagination } from "@/components/ui/table-pagination";
import {
  Building2,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Settings2,
} from "lucide-react";
import OrganizationForm from "./OrganizationForm/OrganizationForm";
import "./Organizations.scss";

interface Organization {
  id: number;
  name: string;
  email: string;
  subscriptionPlan: string;
  userCount: number;
  apiUsage: {
    percentage: number;
    used: number;
    total: number;
  };
  status: "Active" | "Inactive";
  lastActive: string;
  billingStatus: "Paid" | "Pending" | "Overdue";
  lastBillDate: string;
}

export default function Organizations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<number | null>(null);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    plan: true,
    users: true,
    usage: true,
    status: true,
    lastActive: true,
    billingStatus: true,
    lastBillDate: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const organizations: Organization[] = [
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      subscriptionPlan: "Enterprise",
      userCount: 152,
      apiUsage: { percentage: 85.0, used: 850000, total: 1000000 },
      status: "Active",
      lastActive: "2 hours ago",
      billingStatus: "Paid",
      lastBillDate: "July 1st, 2024",
    },
    {
      id: 2,
      name: "DataFlow Systems",
      email: "admin@dataflow.com",
      subscriptionPlan: "Professional",
      userCount: 78,
      apiUsage: { percentage: 45.0, used: 45000, total: 100000 },
      status: "Active",
      lastActive: "1 day ago",
      billingStatus: "Pending",
      lastBillDate: "July 15th, 2024",
    },
    {
      id: 3,
      name: "Cloudify Inc.",
      email: "support@cloudify.com",
      subscriptionPlan: "Enterprise",
      userCount: 213,
      apiUsage: { percentage: 12.0, used: 120000, total: 1000000 },
      status: "Inactive",
      lastActive: "1 week ago",
      billingStatus: "Overdue",
      lastBillDate: "June 20th, 2024",
    },
    {
      id: 4,
      name: "Infiniti Software",
      email: "hello@infiniti.com",
      subscriptionPlan: "Enterprise",
      userCount: 1,
      apiUsage: { percentage: 0.0, used: 0, total: 1000000 },
      status: "Active",
      lastActive: "Never",
      billingStatus: "Pending",
      lastBillDate: "September 1st, 2024",
    },
    {
      id: 5,
      name: "NextGen Analytics",
      email: "info@nextgen.com",
      subscriptionPlan: "Professional",
      userCount: 45,
      apiUsage: { percentage: 67.5, used: 67500, total: 100000 },
      status: "Active",
      lastActive: "3 hours ago",
      billingStatus: "Paid",
      lastBillDate: "July 10th, 2024",
    },
    {
      id: 6,
      name: "Alpha Innovations",
      email: "contact@alpha.com",
      subscriptionPlan: "Enterprise",
      userCount: 89,
      apiUsage: { percentage: 22.3, used: 223000, total: 1000000 },
      status: "Active",
      lastActive: "5 hours ago",
      billingStatus: "Paid",
      lastBillDate: "July 5th, 2024",
    },
    {
      id: 7,
      name: "Vertex Technologies",
      email: "admin@vertex.com",
      subscriptionPlan: "Professional",
      userCount: 34,
      apiUsage: { percentage: 89.2, used: 89200, total: 100000 },
      status: "Active",
      lastActive: "30 minutes ago",
      billingStatus: "Pending",
      lastBillDate: "July 18th, 2024",
    },
    {
      id: 8,
      name: "Quantum Labs",
      email: "support@quantum.com",
      subscriptionPlan: "Enterprise",
      userCount: 167,
      apiUsage: { percentage: 54.8, used: 548000, total: 1000000 },
      status: "Active",
      lastActive: "2 days ago",
      billingStatus: "Paid",
      lastBillDate: "June 28th, 2024",
    },
    {
      id: 9,
      name: "Digital Horizons",
      email: "hello@digitalhorizons.com",
      subscriptionPlan: "Professional",
      userCount: 56,
      apiUsage: { percentage: 31.5, used: 31500, total: 100000 },
      status: "Inactive",
      lastActive: "2 weeks ago",
      billingStatus: "Overdue",
      lastBillDate: "June 15th, 2024",
    },
    {
      id: 10,
      name: "Synergy Systems",
      email: "info@synergy.com",
      subscriptionPlan: "Enterprise",
      userCount: 198,
      apiUsage: { percentage: 73.2, used: 732000, total: 1000000 },
      status: "Active",
      lastActive: "1 hour ago",
      billingStatus: "Paid",
      lastBillDate: "July 3rd, 2024",
    },
    {
      id: 11,
      name: "Phoenix Digital",
      email: "contact@phoenix.com",
      subscriptionPlan: "Professional",
      userCount: 41,
      apiUsage: { percentage: 18.9, used: 18900, total: 100000 },
      status: "Active",
      lastActive: "6 hours ago",
      billingStatus: "Pending",
      lastBillDate: "July 12th, 2024",
    },
    {
      id: 12,
      name: "Stellar Enterprises",
      email: "admin@stellar.com",
      subscriptionPlan: "Enterprise",
      userCount: 224,
      apiUsage: { percentage: 91.4, used: 914000, total: 1000000 },
      status: "Active",
      lastActive: "15 minutes ago",
      billingStatus: "Paid",
      lastBillDate: "July 2nd, 2024",
    },
  ];

  const totalOrganizations = organizations.length;
  const activeOrganizations = organizations.filter(
    (org) => org.status === "Active"
  ).length;
  const enterprisePlans = organizations.filter(
    (org) => org.subscriptionPlan === "Enterprise"
  ).length;
  const highApiUsage = organizations.filter(
    (org) => org.apiUsage.percentage > 70
  ).length;

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrganizations = filteredOrganizations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEditOrganization = (org: Organization) => {
    setEditingOrganization(org);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteOrganization = (orgId: number) => {
    setOrgToDelete(orgId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orgToDelete) {
      console.log("Delete organization:", orgToDelete);
      setDeleteDialogOpen(false);
      setOrgToDelete(null);
    }
  };

  const handleCreateOrganization = () => {
    setEditingOrganization(null);
    setIsCreateDialogOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle create/update logic here
  };

  return (
    <AppLayout
      title="Organizations"
      subtitle="Manage organizations within your SAGE ecosystem"
    >
      <div className="cls-organizations-container">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Organizations</p>
                <h3 className="cls-stat-value">{totalOrganizations}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <Building2 />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Organizations</p>
                <h3 className="cls-stat-value">{activeOrganizations}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+1 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <Activity />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Enterprise Plans</p>
                <h3 className="cls-stat-value">{enterprisePlans}</h3>
                <div className="cls-stat-change cls-stat-neutral">
                  <span>Stable from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-purple">
                <Shield />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">High API Usage</p>
                <h3 className="cls-stat-value">{highApiUsage}</h3>
                <div className="cls-stat-change cls-stat-negative">
                  <TrendingDown size={14} />
                  <span>-1 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <TrendingUp />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organizations Table */}
        <Card className="cls-organizations-card">
          <div className="cls-organizations-header">
            <div className="cls-header-left">
              <Building2 className="cls-header-icon" />
              <h2 className="cls-header-title">All Organizations</h2>
            </div>
            <div className="cls-header-right">
              <div className="cls-search-wrapper">
                <Search className="cls-search-icon" />
                <Input
                  placeholder="Search organizations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="cls-search-input"
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="cls-customize-button">
                    <Settings2 size={16} />
                    Customize
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="cls-customize-popover" align="end">
                  <div className="cls-customize-header">
                    <h4>Customize Columns</h4>
                    <p>Select columns to display</p>
                  </div>
                  <div className="cls-column-options">
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-plan"
                        checked={columnVisibility.plan}
                        onCheckedChange={() => toggleColumn("plan")}
                      />
                      <Label htmlFor="col-plan">Subscription Plan</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-users"
                        checked={columnVisibility.users}
                        onCheckedChange={() => toggleColumn("users")}
                      />
                      <Label htmlFor="col-users">User Count</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-usage"
                        checked={columnVisibility.usage}
                        onCheckedChange={() => toggleColumn("usage")}
                      />
                      <Label htmlFor="col-usage">API Usage</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-status"
                        checked={columnVisibility.status}
                        onCheckedChange={() => toggleColumn("status")}
                      />
                      <Label htmlFor="col-status">Status</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-lastactive"
                        checked={columnVisibility.lastActive}
                        onCheckedChange={() => toggleColumn("lastActive")}
                      />
                      <Label htmlFor="col-lastactive">Last Active</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-billing"
                        checked={columnVisibility.billingStatus}
                        onCheckedChange={() => toggleColumn("billingStatus")}
                      />
                      <Label htmlFor="col-billing">Billing Status</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-billdate"
                        checked={columnVisibility.lastBillDate}
                        onCheckedChange={() => toggleColumn("lastBillDate")}
                      />
                      <Label htmlFor="col-billdate">Last Bill Date</Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button className="cls-create-btn" onClick={handleCreateOrganization}>
                <Plus size={18} />
                New Organization
              </Button>
            </div>
          </div>

          <div className="cls-table-wrapper">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cls-th-sno">S.No.</TableHead>
                  <TableHead className="cls-th-name">Organization Name</TableHead>
                  {columnVisibility.plan && (
                    <TableHead className="cls-th-plan">Subscription Plan</TableHead>
                  )}
                  {columnVisibility.users && (
                    <TableHead className="cls-th-users">User Count</TableHead>
                  )}
                  {columnVisibility.usage && (
                    <TableHead className="cls-th-usage">API Usage</TableHead>
                  )}
                  {columnVisibility.status && (
                    <TableHead className="cls-th-status">Status</TableHead>
                  )}
                  {columnVisibility.lastActive && (
                    <TableHead className="cls-th-active">Last Active</TableHead>
                  )}
                  {columnVisibility.billingStatus && (
                    <TableHead className="cls-th-billing">Billing Status</TableHead>
                  )}
                  {columnVisibility.lastBillDate && (
                    <TableHead className="cls-th-date">Last Bill Date</TableHead>
                  )}
                  <TableHead className="cls-th-actions">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrganizations.length > 0 ? (
                  paginatedOrganizations.map((org, index) => (
                    <TableRow key={org.id} className="cls-table-row">
                      <TableCell className="cls-td-sno">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="cls-td-name">
                        <div className="cls-org-info">
                          <span className="cls-org-name">{org.name}</span>
                          <span className="cls-org-email">{org.email}</span>
                        </div>
                      </TableCell>
                      {columnVisibility.plan && (
                        <TableCell className="cls-td-plan">
                          {org.subscriptionPlan}
                        </TableCell>
                      )}
                      {columnVisibility.users && (
                        <TableCell className="cls-td-users">
                          {org.userCount}
                        </TableCell>
                      )}
                      {columnVisibility.usage && (
                        <TableCell className="cls-td-usage">
                          <div className="cls-usage-container">
                            <span className="cls-usage-text">
                              {org.apiUsage.percentage}% {org.apiUsage.used.toLocaleString()} / used{" "}
                              {org.apiUsage.total.toLocaleString()}
                            </span>
                            <div className="cls-usage-bar">
                              <div
                                className="cls-usage-fill"
                                style={{ width: `${org.apiUsage.percentage}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell className="cls-td-status">
                          <Badge
                            variant={org.status === "Active" ? "default" : "secondary"}
                            className={
                              org.status === "Active"
                                ? "cls-badge-active"
                                : "cls-badge-inactive"
                            }
                          >
                            {org.status}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.lastActive && (
                        <TableCell className="cls-td-active">
                          {org.lastActive}
                        </TableCell>
                      )}
                      {columnVisibility.billingStatus && (
                        <TableCell className="cls-td-billing">
                          <Badge
                            variant="secondary"
                            className={`cls-badge-billing cls-badge-${org.billingStatus.toLowerCase()}`}
                          >
                            {org.billingStatus}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.lastBillDate && (
                        <TableCell className="cls-td-date">
                          {org.lastBillDate}
                        </TableCell>
                      )}
                      <TableCell className="cls-td-actions">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cls-actions-btn"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditOrganization(org)}
                              className="cls-menu-item"
                            >
                              <Pencil size={16} />
                              Edit Organization
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteOrganization(org.id)}
                              className="cls-menu-item cls-delete-item"
                            >
                              <Trash2 size={16} />
                              Delete Organization
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={
                        2 + 
                        (columnVisibility.plan ? 1 : 0) + 
                        (columnVisibility.users ? 1 : 0) + 
                        (columnVisibility.usage ? 1 : 0) + 
                        (columnVisibility.status ? 1 : 0) + 
                        (columnVisibility.lastActive ? 1 : 0) + 
                        (columnVisibility.billingStatus ? 1 : 0) + 
                        (columnVisibility.lastBillDate ? 1 : 0) + 
                        1
                      } 
                      className="cls-no-results"
                    >
                      No organizations found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredOrganizations.length}
            startIndex={startIndex}
            endIndex={startIndex + itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </Card>

        <OrganizationForm
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleFormSubmit}
          editData={editingOrganization}
          isEdit={!!editingOrganization}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Warning!</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to delete this organization? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
