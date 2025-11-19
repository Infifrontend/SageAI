import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users as UsersIcon,
  UserCheck,
  UserPlus,
  UserX,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Settings2,
  Download,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./Users.scss";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  organization: string;
  role: string;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
}

const usersData: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    organization: "TechCorp Solutions",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    organization: "DataFlow Systems",
    role: "Developer",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    organization: "TechCorp Solutions",
    role: "Billing Manager",
    status: "Suspended",
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    organization: "Cloudify Inc.",
    role: "Viewer",
    status: "Active",
    lastActive: "5 minutes ago",
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    email: "alex.r@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    organization: "DataFlow Systems",
    role: "Developer",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: "6",
    name: "Jessica Taylor",
    email: "jessica.t@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    organization: "TechCorp Solutions",
    role: "Admin",
    status: "Active",
    lastActive: "30 minutes ago",
  },
  {
    id: "7",
    name: "David Brown",
    email: "david.brown@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    organization: "Infiniti Software Solutions",
    role: "Developer",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.a@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    organization: "Cloudify Inc.",
    role: "Billing Manager",
    status: "Active",
    lastActive: "2 days ago",
  },
  {
    id: "9",
    name: "Robert Wilson",
    email: "robert.w@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    organization: "DataFlow Systems",
    role: "Viewer",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: "10",
    name: "Michelle Lee",
    email: "michelle.lee@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michelle",
    organization: "TechCorp Solutions",
    role: "Developer",
    status: "Suspended",
    lastActive: "5 days ago",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [, setLocation] = useLocation();

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    organization: true,
    role: true,
    status: true,
    lastActive: true,
  });

  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Filter users based on search, role, and status
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter((u) => u.status === "Active").length;
  const pendingUsers = usersData.filter((u) => u.status === "Pending").length;
  const suspendedUsers = usersData.filter(
    (u) => u.status === "Suspended",
  ).length;

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleEdit = (user: User) => {
    // TODO: Navigate to edit form with user data
    setLocation("/users/edit/" + user.id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
  };

  const handleExport = () => {
    console.log("Export users");
  };

  return (
    <AppLayout title="Users" subtitle="Manage users and their permissions">
      <div className="cls-users-page">
        {/* Stats Cards */}
        <div className="cls-stats-grid">
          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Total Users</p>
                <h3 className="cls-stat-value">{totalUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-blue">
                <UsersIcon />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Active Users</p>
                <h3 className="cls-stat-value">{activeUsers}</h3>
                <div className="cls-stat-change cls-stat-negative">
                  <TrendingDown size={14} />
                  <span>-4% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-green">
                <UserCheck />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Pending Users</p>
                <h3 className="cls-stat-value">{pendingUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+25% from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-yellow">
                <UserPlus />
              </div>
            </CardContent>
          </Card>

          <Card className="cls-stat-card">
            <CardContent className="cls-stat-content">
              <div className="cls-stat-info">
                <p className="cls-stat-label">Suspended Users</p>
                <h3 className="cls-stat-value">{suspendedUsers}</h3>
                <div className="cls-stat-change cls-stat-positive">
                  <TrendingUp size={14} />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="cls-stat-icon cls-icon-red">
                <UserX />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card className="cls-management-card">
          <CardContent className="cls-management-content">
            <div className="cls-management-header pt-2 pb-4">
              <div className="cls-header-left">
                <UsersIcon className="cls-header-icon" />
                <h2 className="cls-header-title">All Users</h2>
              </div>
              <div className="cls-header-actions">
                <div className="cls-search-container">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>

                <Select
                  value={roleFilter}
                  onValueChange={(value) => {
                    setRoleFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Billing Manager">
                      Billing Manager
                    </SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

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
                          id="col-organization"
                          checked={columnVisibility.organization}
                          onCheckedChange={() => toggleColumn("organization")}
                        />
                        <Label htmlFor="col-organization">Organization</Label>
                      </div>
                      <div className="cls-column-option">
                        <Checkbox
                          id="col-role"
                          checked={columnVisibility.role}
                          onCheckedChange={() => toggleColumn("role")}
                        />
                        <Label htmlFor="col-role">Role</Label>
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
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="cls-export-button"
                >
                  <Download size={16} />
                  Export Users
                </Button>

                <Button
                  onClick={() => setLocation("/users/new")}
                  className="cls-add-user-button"
                >
                  <Plus size={16} />
                  Add User
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="cls-table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No.</TableHead>
                    <TableHead>User</TableHead>
                    {columnVisibility.organization && (
                      <TableHead>Organization</TableHead>
                    )}
                    {columnVisibility.role && <TableHead>Role</TableHead>}
                    {columnVisibility.status && <TableHead>Status</TableHead>}
                    {columnVisibility.lastActive && (
                      <TableHead>Last Active</TableHead>
                    )}
                    <TableHead className="cls-actions-head"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="cls-sno-cell">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="cls-user-cell">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="cls-user-avatar"
                          />
                          <div className="cls-user-info">
                            <p className="cls-user-name">{user.name}</p>
                            <p className="cls-user-email">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      {columnVisibility.organization && (
                        <TableCell>
                          <span className="cls-organization">
                            {user.organization}
                          </span>
                        </TableCell>
                      )}
                      {columnVisibility.role && (
                        <TableCell>
                          <Badge
                            className={`cls-role-badge cls-role-${user.role.toLowerCase().replace(" ", "-")}`}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell>
                          <Badge
                            className={`cls-status-badge cls-status-${user.status.toLowerCase()}`}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.lastActive && (
                        <TableCell>
                          <span className="cls-last-active">
                            {user.lastActive}
                          </span>
                        </TableCell>
                      )}
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
                            <DropdownMenuItem
                              onClick={() => handleEdit(user)}
                              className="cls-menu-item"
                            >
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(user.id)}
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
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    </AppLayout>
  );
}
