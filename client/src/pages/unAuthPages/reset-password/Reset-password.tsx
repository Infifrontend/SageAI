import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import authIllustration from '@assets/generated_images/Auth_page_side_illustration_6a131ae3.png';
import './reset-password.scss';

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { id: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'One number', test: (pwd) => /\d/.test(pwd) },
];

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const passwordStrength = passwordRequirements.filter(req => req.test(newPassword)).length;
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid = passwordStrength === passwordRequirements.length && passwordsMatch;

  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = '/login';
    }
  }, [isSubmitted, countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Password reset successful');
      setIsSubmitted(true);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'cls-strength-none';
    if (passwordStrength <= 2) return 'cls-strength-weak';
    if (passwordStrength === 3) return 'cls-strength-medium';
    return 'cls-strength-strong';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="cls-auth-container">
      <div className="cls-auth-split-layout">
        <div className="cls-auth-illustration-panel">
          <div className="cls-illustration-content">
            <img 
              src={authIllustration} 
              alt="Sage App Authentication" 
              className="cls-illustration-image"
            />
            <div className="cls-illustration-overlay">
              <h2 className="cls-illustration-title">Secure Your Account</h2>
              <p className="cls-illustration-subtitle">
                Create a strong password to protect your account
              </p>
            </div>
          </div>
        </div>

        <div className="cls-auth-form-panel">
          <div className="cls-form-container">
            {!isSubmitted ? (
              <>
                <div className="cls-form-header">
                  <h1 className="cls-page-title">Reset Password</h1>
                  <p className="cls-page-subtitle">
                    Please enter your new password below
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="cls-auth-form">
                  <div className="cls-form-group">
                    <Label htmlFor="new-password" className="cls-form-label">
                      New Password
                    </Label>
                    <div className="cls-input-wrapper">
                      <Lock className="cls-input-icon" size={20} />
                      <Input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="cls-form-input cls-password-input"
                        required
                        data-testid="input-new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="cls-password-toggle"
                        aria-label="Toggle password visibility"
                        data-testid="button-toggle-new-password"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    {newPassword && (
                      <div className="cls-password-strength">
                        <div className="cls-strength-bar-container">
                          <div 
                            className={`cls-strength-bar ${getStrengthColor()}`}
                            style={{ width: `${(passwordStrength / passwordRequirements.length) * 100}%` }}
                          />
                        </div>
                        {getStrengthLabel() && (
                          <span className={`cls-strength-label ${getStrengthColor()}`}>
                            {getStrengthLabel()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {newPassword && (
                    <div className="cls-requirements-list">
                      {passwordRequirements.map((req) => (
                        <div 
                          key={req.id} 
                          className={`cls-requirement ${req.test(newPassword) ? 'cls-requirement-met' : ''}`}
                        >
                          {req.test(newPassword) ? (
                            <Check size={16} className="cls-requirement-icon" />
                          ) : (
                            <X size={16} className="cls-requirement-icon" />
                          )}
                          <span>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="cls-form-group">
                    <Label htmlFor="confirm-password" className="cls-form-label">
                      Confirm Password
                    </Label>
                    <div className="cls-input-wrapper">
                      <Lock className="cls-input-icon" size={20} />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="cls-form-input cls-password-input"
                        required
                        data-testid="input-confirm-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="cls-password-toggle"
                        aria-label="Toggle password visibility"
                        data-testid="button-toggle-confirm-password"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {confirmPassword && !passwordsMatch && (
                      <p className="cls-error-message">Passwords do not match</p>
                    )}
                    {passwordsMatch && (
                      <p className="cls-success-message">Passwords match!</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="cls-submit-button"
                    disabled={!isFormValid}
                    data-testid="button-reset-password"
                  >
                    Reset Password
                  </Button>
                </form>
              </>
            ) : (
              <div className="cls-success-state">
                <div className="cls-success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2 className="cls-success-title">Password Reset Successful!</h2>
                <p className="cls-success-message">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <p className="cls-countdown-text">
                  Redirecting to login in <strong>{countdown}</strong> seconds...
                </p>
                <Button
                  onClick={() => window.location.href = '/login'}
                  className="cls-submit-button"
                  data-testid="button-go-login"
                >
                  Go to Login Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
