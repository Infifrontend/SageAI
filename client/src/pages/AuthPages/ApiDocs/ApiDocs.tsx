
import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Search,
  LayoutGrid,
  List,
  Plus,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { TablePagination } from "@/components/ui/table-pagination";
import "./ApiDocs.scss";

interface ApiCollection {
  id: string;
  name: string;
  version: string;
  status: "active" | "inactive";
  description: string;
  createdBy: string;
  createdDate: string;
}

const apiCollectionsData: ApiCollection[] = [
  {
    id: "1",
    name: "GRM API",
    version: "1.0.0",
    status: "active",
    description:
      "GRM API provides endpoints for authentication, user management, ancillary services, policy...",
    createdBy: "admin@sage.co",
    createdDate: "July 20th, 2024",
  },
  {
    id: "2",
    name: "Sample API",
    version: "1.0.0",
    status: "inactive",
    description: "A sample API to illustrate OpenAPI concepts.",
    createdBy: "admin@sage.co",
    createdDate: "July 22nd, 2024",
  },
  {
    id: "3",
    name: "Payment Gateway API",
    version: "2.1.0",
    status: "active",
    description:
      "Secure payment processing API with support for multiple payment methods and currencies.",
    createdBy: "admin@sage.co",
    createdDate: "August 5th, 2024",
  },
  {
    id: "4",
    name: "Analytics API",
    version: "1.5.2",
    status: "active",
    description:
      "Real-time analytics and reporting API for tracking user behavior and system metrics.",
    createdBy: "admin@sage.co",
    createdDate: "September 12th, 2024",
  },
  {
    id: "5",
    name: "Notification Service API",
    version: "1.2.0",
    status: "inactive",
    description:
      "Multi-channel notification service supporting email, SMS, and push notifications.",
    createdBy: "admin@sage.co",
    createdDate: "October 3rd, 2024",
  },
  {
    id: "6",
    name: "User Management API",
    version: "3.0.0",
    status: "active",
    description:
      "Comprehensive user management system with role-based access control and audit logging.",
    createdBy: "admin@sage.co",
    createdDate: "November 8th, 2024",
  },
  {
    id: "7",
    name: "File Storage API",
    version: "2.0.1",
    status: "active",
    description:
      "Scalable file storage and retrieval service with CDN integration and versioning support.",
    createdBy: "admin@sage.co",
    createdDate: "December 1st, 2024",
  },
];

export default function ApiDocs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filter API collections
  const filteredCollections = apiCollectionsData.filter((collection) => {
    const matchesSearch =
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || collection.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCollections = filteredCollections.slice(startIndex, endIndex);

  const handleViewDocumentation = (collectionId: string) => {
    console.log("View documentation for:", collectionId);
  };

  return (
    <AppLayout
      title="API Documentation"
      subtitle="Explore and interact with the available SAGE APIs."
    >
      <div className="cls-apidocs-container">
        <Card className="cls-collections-card">
          <CardContent className="cls-collections-content">
            {/* Header */}
            <div className="cls-collections-header">
              <div className="cls-header-left">
                <BookOpen className="cls-header-icon" />
                <h2 className="cls-header-title">API Collections</h2>
              </div>
              <div className="cls-header-actions">
                {/* Search */}
                <div className="cls-search-container">
                  <Search className="cls-search-icon" />
                  <Input
                    type="text"
                    placeholder="Search collections..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>

                {/* Status Filter */}
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-filter-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="cls-view-toggle">
                  <Button
                    variant={viewMode === "card" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("card")}
                    className="cls-view-btn"
                  >
                    <LayoutGrid size={16} />
                    Card View
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="cls-view-btn"
                  >
                    <List size={16} />
                    List View
                  </Button>
                </div>

                {/* New Collection Button */}
                <Button className="cls-new-collection-btn">
                  <Plus size={16} />
                  New API Collection
                </Button>
              </div>
            </div>

            {/* Collections Grid/List */}
            {paginatedCollections.length === 0 ? (
              <div className="cls-empty-state">
                <BookOpen className="cls-empty-icon" />
                <h3 className="cls-empty-title">No API Collections Found</h3>
                <p className="cls-empty-description">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "card"
                    ? "cls-collections-grid"
                    : "cls-collections-list"
                }
              >
                {paginatedCollections.map((collection) => (
                  <Card
                    key={collection.id}
                    className={
                      viewMode === "card"
                        ? "cls-collection-card"
                        : "cls-collection-list-item"
                    }
                  >
                    <CardContent
                      className={
                        viewMode === "card"
                          ? "cls-collection-card-content"
                          : "cls-collection-list-content"
                      }
                    >
                      <div className="cls-collection-header">
                        <div className="cls-collection-icon">
                          <BookOpen size={24} />
                        </div>
                        <div className="cls-collection-title-section">
                          <div className="cls-title-row">
                            <h3 className="cls-collection-name">
                              {collection.name}
                            </h3>
                            <Badge
                              className={
                                collection.status === "active"
                                  ? "cls-status-badge-active"
                                  : "cls-status-badge-inactive"
                              }
                            >
                              {collection.status}
                            </Badge>
                          </div>
                          <p className="cls-collection-version">
                            Version {collection.version}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cls-menu-trigger"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cls-menu-item">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cls-menu-item">
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cls-menu-item cls-menu-item-danger">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="cls-collection-description">
                        {collection.description}
                      </p>

                      <div className="cls-collection-footer">
                        <p className="cls-collection-meta">
                          Created by {collection.createdBy} on{" "}
                          {collection.createdDate}
                        </p>
                        <Button
                          onClick={() => handleViewDocumentation(collection.id)}
                          className="cls-view-docs-btn"
                        >
                          View Documentation
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredCollections.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredCollections.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>
    </AppLayout>
  );
}
