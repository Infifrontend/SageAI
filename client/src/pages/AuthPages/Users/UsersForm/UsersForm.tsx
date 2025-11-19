
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  Code,
  CreditCard,
  Eye,
  Check,
  ChevronLeft,
} from "lucide-react";
import "./UsersForm.scss";

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const roleOptions: RoleOption[] = [
  {
    id: "admin",
    title: "Admin",
    description: "Full access to all features",
    icon: Shield,
  },
  {
    id: "developer",
    title: "Developer",
    description: "Can manage API keys and view usage",
    icon: Code,
  },
  {
    id: "billing-manager",
    title: "Billing Manager",
    description: "Can view and manage billing information",
    icon: CreditCard,
  },
  {
    id: "viewer",
    title: "Viewer",
    description: "Read-only access to dashboards",
    icon: Eye,
  },
];

interface UsersFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export default function UsersForm({ open, onOpenChange, onSubmit }: UsersFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    role: "",
    sendInvitation: true,
    requirePasswordReset: true,
    notes: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    organization: false,
  });

  const validateStep1 = () => {
    const newErrors = {
      fullName: !formData.fullName.trim(),
      email: !formData.email.trim() || !formData.email.includes("@"),
      organization: !formData.organization,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep === 2 && !formData.role) {
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Creating user:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      organization: "",
      role: "",
      sendInvitation: true,
      requirePasswordReset: true,
      notes: "",
      status: "Pending",
    });
    setCurrentStep(1);
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      organization: "",
      role: "",
      sendInvitation: true,
      requirePasswordReset: true,
      notes: "",
      status: "Pending",
    });
    setCurrentStep(1);
    setErrors({
      fullName: false,
      email: false,
      organization: false,
    });
    onOpenChange(false);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="cls-users-form-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">Add New User</DialogTitle>
          <p className="cls-dialog-subtitle">
            {currentStep === 1 && "Enter the information for the new user."}
            {currentStep === 2 &&
              "Select the appropriate role and permissions for this user."}
            {currentStep === 3 &&
              "Configure account settings for the new user."}
            {currentStep === 4 &&
              "Review all user details before saving the account."}
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="cls-progress-section">
          <p className="cls-step-label">Step {currentStep} of {totalSteps}</p>
          <div className="cls-progress-bar">
            <div
              className="cls-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="cls-step-content">
            <div className="cls-form-field">
              <Label htmlFor="fullName">
                Full Name <span className="cls-required">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="e.g., John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={errors.fullName ? "cls-input-error" : ""}
              />
              {errors.fullName && (
                <p className="cls-error-text">Full name is required</p>
              )}
            </div>

            <div className="cls-form-field">
              <Label htmlFor="email">
                Email Address <span className="cls-required">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., john.doe@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? "cls-input-error" : ""}
              />
              {errors.email && (
                <p className="cls-error-text">Valid email is required</p>
              )}
            </div>

            <div className="cls-form-field">
              <Label htmlFor="organization">
                Organization <span className="cls-required">*</span>
              </Label>
              <Select
                value={formData.organization}
                onValueChange={(value) =>
                  setFormData({ ...formData, organization: value })
                }
              >
                <SelectTrigger
                  id="organization"
                  className={errors.organization ? "cls-input-error" : ""}
                >
                  <SelectValue placeholder="Select an organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TechCorp Solutions">
                    TechCorp Solutions
                  </SelectItem>
                  <SelectItem value="DataFlow Systems">
                    DataFlow Systems
                  </SelectItem>
                  <SelectItem value="Cloudify Inc.">
                    Cloudify Inc.
                  </SelectItem>
                  <SelectItem value="Infiniti Software Solutions">
                    Infiniti Software Solutions
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.organization && (
                <p className="cls-error-text">Organization is required</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {currentStep === 2 && (
          <div className="cls-step-content">
            <div className="cls-role-options">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  className={`cls-role-card ${
                    formData.role === role.id ? "cls-role-selected" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, role: role.id })}
                >
                  <div className="cls-role-header">
                    <div className="cls-role-icon">
                      <role.icon size={20} />
                    </div>
                    <div className="cls-role-info">
                      <h4>{role.title}</h4>
                      <p>{role.description}</p>
                    </div>
                  </div>
                  {formData.role === role.id && (
                    <div className="cls-role-check">
                      <Check size={20} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Account Settings */}
        {currentStep === 3 && (
          <div className="cls-step-content">
            <h3 className="cls-section-title">Account Settings</h3>

            <div className="cls-settings-option">
              <div className="cls-setting-info">
                <Label htmlFor="sendInvitation">Send Invitation Email</Label>
                <p className="cls-setting-description">
                  Send an email invitation to the user with account setup
                  instructions
                </p>
              </div>
              <Switch
                id="sendInvitation"
                checked={formData.sendInvitation}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, sendInvitation: checked })
                }
              />
            </div>

            <div className="cls-settings-option">
              <div className="cls-setting-info">
                <Label htmlFor="requirePasswordReset">
                  Require Password Reset
                </Label>
                <p className="cls-setting-description">
                  User must set a new password on first login
                </p>
              </div>
              <Switch
                id="requirePasswordReset"
                checked={formData.requirePasswordReset}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, requirePasswordReset: checked })
                }
              />
            </div>

            <div className="cls-form-field">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this user..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="cls-step-content">
            <div className="cls-form-field">
              <Label htmlFor="status">
                Status <span className="cls-required">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="cls-review-section">
              <h3 className="cls-section-title">User Information</h3>
              <div className="cls-review-grid">
                <div className="cls-review-item">
                  <p className="cls-review-label">Name</p>
                  <p className="cls-review-value">{formData.fullName}</p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Email</p>
                  <p className="cls-review-value">{formData.email}</p>
                </div>
                <div className="cls-review-item">
                  <p className="cls-review-label">Organization</p>
                  <p className="cls-review-value">{formData.organization}</p>
                </div>
              </div>
            </div>

            <div className="cls-review-section">
              <h3 className="cls-section-title">Role & Permissions</h3>
              <div className="cls-role-display">
                {roleOptions.find((r) => r.id === formData.role) && (
                  <div className="cls-role-summary">
                    <div className="cls-role-icon-small">
                      {(() => {
                        const selectedRole = roleOptions.find((r) => r.id === formData.role);
                        const IconComponent = selectedRole?.icon;
                        return IconComponent ? <IconComponent size={20} /> : null;
                      })()}
                    </div>
                    <div>
                      <p className="cls-role-name">
                        {
                          roleOptions.find((r) => r.id === formData.role)
                            ?.title
                        }
                      </p>
                      <p className="cls-role-desc">
                        {
                          roleOptions.find((r) => r.id === formData.role)
                            ?.description
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="cls-review-section">
              <h3 className="cls-section-title">Account Configuration</h3>
              <div className="cls-config-list">
                <div className="cls-config-item">
                  <p className="cls-config-label">Send Invitation:</p>
                  <span
                    className={`cls-config-badge ${
                      formData.sendInvitation ? "cls-yes" : "cls-no"
                    }`}
                  >
                    {formData.sendInvitation ? "Yes" : "No"}
                  </span>
                </div>
                <div className="cls-config-item">
                  <p className="cls-config-label">Require Password Reset:</p>
                  <span
                    className={`cls-config-badge ${
                      formData.requirePasswordReset ? "cls-yes" : "cls-no"
                    }`}
                  >
                    {formData.requirePasswordReset ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="cls-form-footer">
          <Button variant="outline" onClick={currentStep === 1 ? handleClose : handleBack}>
            <ChevronLeft size={16} />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Create User</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
