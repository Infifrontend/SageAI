
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TablePagination } from "@/components/ui/table-pagination";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Shield,
  Settings2,
} from "lucide-react";
import RolesForm from "./RolesForm/RolesForm";
import "./Roles.scss";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number;
  status: "Active" | "Inactive";
}

export default function Roles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    description: true,
    permissions: true,
    status: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const roles: Role[] = [
    {
      id: 1,
      name: "Admin",
      description: "Full access to all features",
      permissions: 13,
      status: "Active",
    },
    {
      id: 2,
      name: "Developer",
      description: "Can manage API keys and view usage",
      permissions: 7,
      status: "Active",
    },
    {
      id: 3,
      name: "Billing Manager",
      description: "Can view and manage billing information",
      permissions: 3,
      status: "Active",
    },
    {
      id: 4,
      name: "Viewer",
      description: "Read-only access to dashboards",
      permissions: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "Support Engineer",
      description: "Access to user information for support",
      permissions: 4,
      status: "Inactive",
    },
    {
      id: 6,
      name: "Content Manager",
      description: "Can create and manage content",
      permissions: 5,
      status: "Active",
    },
    {
      id: 7,
      name: "API Manager",
      description: "Manage API keys and documentation",
      permissions: 6,
      status: "Active",
    },
    {
      id: 8,
      name: "Analytics Viewer",
      description: "View analytics and reports",
      permissions: 3,
      status: "Active",
    },
    {
      id: 9,
      name: "User Manager",
      description: "Manage users and permissions",
      permissions: 8,
      status: "Active",
    },
    {
      id: 10,
      name: "Subscription Manager",
      description: "Handle subscription plans and billing",
      permissions: 4,
      status: "Inactive",
    },
    {
      id: 11,
      name: "Security Admin",
      description: "Manage security settings and policies",
      permissions: 10,
      status: "Active",
    },
    {
      id: 12,
      name: "Guest",
      description: "Limited read-only access",
      permissions: 1,
      status: "Active",
    },
  ];

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCreateRole = () => {
    setEditingRole(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteRole = (roleId: number) => {
    setRoleToDelete(roleId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      console.log("Delete role:", roleToDelete);
      // Add delete logic here
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleToggleStatus = (roleId: number, currentStatus: string) => {
    console.log("Toggle status for role:", roleId, currentStatus);
    // Add status toggle logic here
  };

  const handleSubmit = (formData: any) => {
    console.log("Role form submitted:", formData);
  };

  return (
    <AppLayout
      title="Roles & Privileges"
      subtitle="Configure user roles and their associated permissions"
    >
      <div className="cls-roles-container">
        <Card className="cls-roles-card">
          <div className="cls-roles-header">
            <div className="cls-header-left">
              <Shield className="cls-header-icon" />
              <h2 className="cls-header-title">All Roles</h2>
            </div>
            <div className="cls-header-right">
              <div className="cls-search-wrapper">
                <Search className="cls-search-icon" />
                <Input
                  placeholder="Search roles..."
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
                        id="col-description"
                        checked={columnVisibility.description}
                        onCheckedChange={() => toggleColumn("description")}
                      />
                      <Label htmlFor="col-description">Description</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-permissions"
                        checked={columnVisibility.permissions}
                        onCheckedChange={() => toggleColumn("permissions")}
                      />
                      <Label htmlFor="col-permissions">Permissions</Label>
                    </div>
                    <div className="cls-column-option">
                      <Checkbox
                        id="col-status"
                        checked={columnVisibility.status}
                        onCheckedChange={() => toggleColumn("status")}
                      />
                      <Label htmlFor="col-status">Status</Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button onClick={handleCreateRole} className="cls-create-btn">
                <Plus size={18} />
                New Role
              </Button>
            </div>
          </div>

          <div className="cls-table-wrapper">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cls-th-sno">S.No.</TableHead>
                  <TableHead className="cls-th-name">Role Name</TableHead>
                  {columnVisibility.description && (
                    <TableHead className="cls-th-desc">Description</TableHead>
                  )}
                  {columnVisibility.permissions && (
                    <TableHead className="cls-th-permissions">
                      Permissions
                    </TableHead>
                  )}
                  {columnVisibility.status && (
                    <TableHead className="cls-th-status">Status</TableHead>
                  )}
                  <TableHead className="cls-th-actions">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRoles.length > 0 ? (
                  paginatedRoles.map((role, index) => (
                    <TableRow key={role.id} className="cls-table-row">
                      <TableCell className="cls-td-sno">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="cls-td-name">
                        <span className="cls-role-name">{role.name}</span>
                      </TableCell>
                      {columnVisibility.description && (
                        <TableCell className="cls-td-desc">
                          {role.description}
                        </TableCell>
                      )}
                      {columnVisibility.permissions && (
                        <TableCell className="cls-td-permissions">
                          <Badge variant="secondary" className="cls-permissions-badge">
                            {role.permissions} permission{role.permissions !== 1 ? "s" : ""}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell className="cls-td-status">
                          <div className="cls-status-switch">
                            <Switch
                              checked={role.status === "Active"}
                              onCheckedChange={() =>
                                handleToggleStatus(role.id, role.status)
                              }
                            />
                            <span
                              className={`cls-status-label ${
                                role.status === "Active"
                                  ? "cls-active"
                                  : "cls-inactive"
                              }`}
                            >
                              {role.status}
                            </span>
                          </div>
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
                              onClick={() => handleEditRole(role)}
                              className="cls-menu-item"
                            >
                              <Pencil size={16} />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRole(role.id)}
                              className="cls-menu-item cls-delete-item"
                            >
                              <Trash2 size={16} />
                              Delete Role
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
                        (columnVisibility.description ? 1 : 0) + 
                        (columnVisibility.permissions ? 1 : 0) + 
                        (columnVisibility.status ? 1 : 0) + 
                        1
                      } 
                      className="cls-no-results"
                    >
                      No roles found matching your search.
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
            totalItems={filteredRoles.length}
            startIndex={startIndex}
            endIndex={startIndex + itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </Card>
      </div>

      <RolesForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleSubmit}
        editData={editingRole}
        isEdit={!!editingRole}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Warning!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Do you want to delete this role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
