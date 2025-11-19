
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import TablePagination from "@/components/ui/table-pagination";
import {
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Shield,
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

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
    console.log("Delete role:", roleId);
  };

  const handleViewRole = (roleId: number) => {
    console.log("View role:", roleId);
  };

  const handleToggleStatus = (roleId: number, currentStatus: string) => {
    console.log("Toggle status for role:", roleId, currentStatus);
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
                  <TableHead className="cls-th-desc">Description</TableHead>
                  <TableHead className="cls-th-permissions">
                    Permissions
                  </TableHead>
                  <TableHead className="cls-th-status">Status</TableHead>
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
                      <TableCell className="cls-td-desc">
                        {role.description}
                      </TableCell>
                      <TableCell className="cls-td-permissions">
                        <Badge variant="secondary" className="cls-permissions-badge">
                          {role.permissions} permission{role.permissions !== 1 ? "s" : ""}
                        </Badge>
                      </TableCell>
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
                              onClick={() => handleViewRole(role.id)}
                            >
                              <Eye size={16} />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditRole(role)}
                            >
                              <Pencil size={16} />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRole(role.id)}
                              className="cls-delete-item"
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
                    <TableCell colSpan={6} className="cls-no-results">
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
    </AppLayout>
  );
}
