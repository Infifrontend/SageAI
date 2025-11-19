import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Code,
  Key,
  FileText,
  Users,
  UserCheck,
  Building2,
  CreditCard,
  Package,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "./AppLayout.scss";

interface MenuItem {
  title: string;
  icon: any;
  href?: string;
  items?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "API Management",
    icon: Code,
    items: [
      { title: "API Keys", href: "/api-keys" },
      { title: "API Docs", href: "/api-docs" },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "Users", href: "/users" },
      { title: "Roles & Privileges", href: "/roles" },
      { title: "Organizations", href: "/organizations" },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    title: "Subscription Plans",
    icon: Package,
    href: "/subscriptions",
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

function SidebarHeaderComponent() {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <SidebarHeader className="cls-sidebar-header">
      <div className="cls-logo">
        <div className="cls-logo-icon">
          {state === "collapsed" ? <PanelLeftOpen /> : <PanelLeftClose />}
        </div>
        <div className="cls-logo-text">
          <h1>SAGE</h1>
          <p>Seamless API for Group Engagement</p>
        </div>
      </div>
      <button 
        className="cls-collapse-button"
        onClick={toggleSidebar}
        aria-label={state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
      >
        {state === "collapsed" ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </SidebarHeader>
  );
}

export default function AppLayout({
  children,
  title,
  subtitle,
}: AppLayoutProps) {
  const [location] = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Initialize open menu based on current location
  React.useEffect(() => {
    const currentMenu = menuItems.find((item) => 
      item.items?.some((subItem) => subItem.href === location)
    );
    if (currentMenu && !openMenus.includes(currentMenu.title)) {
      setOpenMenus([currentMenu.title]);
    }
  }, [location]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => {
      // If the menu is already open, close it
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      }
      // Otherwise, close all other menus and open this one
      return [title];
    });
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <SidebarProvider>
      <div className="cls-app-layout">
        <Sidebar className="cls-sidebar" collapsible="icon">
          <SidebarHeaderComponent />

          <SidebarContent className="cls-sidebar-content">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      open={openMenus.includes(item.title)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className="cls-menu-button"
                          tooltip={item.title}
                        >
                          <item.icon className="cls-menu-icon" />
                          <span>{item.title}</span>
                          {openMenus.includes(item.title) ? (
                            <ChevronDown className="cls-chevron" />
                          ) : (
                            <ChevronRight className="cls-chevron" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="cls-submenu">
                        {item.items.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <SidebarMenuButton
                              isActive={location === subItem.href}
                              className="cls-submenu-button"
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link href={item.href!}>
                      <SidebarMenuButton
                        isActive={location === item.href}
                        className="cls-menu-button"
                        tooltip={item.title}
                      >
                        <item.icon className="cls-menu-icon" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="cls-sidebar-footer">
            <div className="cls-user-profile">
              <Avatar className="cls-avatar">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="cls-user-info">
                <p className="cls-user-name">admin</p>
                <p className="cls-user-role">Admin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="cls-logout-button"
            >
              <LogOut className="cls-logout-icon" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="cls-main-content">
          <header className="cls-header">
            <div className="cls-header-left">
              <SidebarTrigger className="cls-sidebar-trigger" />
              <div className="cls-header-info">
                <h1 className="cls-header-title">{title}</h1>
                {subtitle && <p className="cls-header-subtitle">{subtitle}</p>}
              </div>
            </div>
            <div className="cls-header-actions">
              <Button variant="ghost" size="icon" className="cls-header-button">
                <Bell className="cls-icon" />
              </Button>
              <Button variant="ghost" size="icon" className="cls-header-button">
                <Settings className="cls-icon" />
              </Button>
            </div>
          </header>

          <main className="cls-content">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
