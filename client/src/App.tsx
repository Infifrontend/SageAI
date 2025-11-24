import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/unAuthPages/login/Login";
import ForgotPassword from "@/pages/unAuthPages/forgot-password/Forgot-password";
import ResetPassword from "@/pages/unAuthPages/reset-password/Reset-password";
import Dashboard from "@/pages/AuthPages/Dashboard/Dashboard";
import ApiKeys from "@/pages/AuthPages/ApiKeys/ApiKeys";
import ApiDocs from "@/pages/AuthPages/ApiDocs/ApiDocs";
import ApiDocDetail from "@/pages/AuthPages/ApiDocs/ApiDocDetail";
import UsersPage from "@/pages/AuthPages/Users/Users";
import RolesPage from "@/pages/AuthPages/Roles/Roles";
import OrganizationsPage from "@/pages/AuthPages/Organizations/Organizations";
import Billing from "@/pages/AuthPages/Billing/Billing";
import Subscriptions from "@/pages/AuthPages/Subscriptions/Subscriptions";
import Analytics from "./pages/AuthPages/Analytics/Analytics";
import SideMenu from "./pages/AuthPages/SideMenu/SideMenu";
import Settings from "./pages/AuthPages/Settings/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/api-keys" component={ApiKeys} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/api-docs/:id" component={ApiDocDetail} />
      <Route path="/users" component={UsersPage} />
      <Route path="/roles" component={RolesPage} />
      <Route path="/organizations" component={OrganizationsPage} />
      <Route path="/billing" component={Billing} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/side-menu" component={SideMenu} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;