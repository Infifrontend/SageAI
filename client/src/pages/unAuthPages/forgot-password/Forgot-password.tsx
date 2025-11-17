import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import authIllustration from '@assets/generated_images/Auth_page_side_illustration_6a131ae3.png';
import './forgot-password.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
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
              <h2 className="cls-illustration-title">Recover Your Account</h2>
              <p className="cls-illustration-subtitle">
                We'll help you reset your password securely
              </p>
            </div>
          </div>
        </div>

        <div className="cls-auth-form-panel">
          <div className="cls-form-container">
            {!isSubmitted ? (
              <>
                <div className="cls-form-header">
                  <h1 className="cls-page-title">Forgot Password?</h1>
                  <p className="cls-page-subtitle">
                    No worries! Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="cls-auth-form">
                  <div className="cls-form-group">
                    <Label htmlFor="email" className="cls-form-label">
                      Email Address
                    </Label>
                    <div className="cls-input-wrapper">
                      <Mail className="cls-input-icon" size={20} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="cls-form-input"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="cls-submit-button"
                    data-testid="button-send-reset"
                  >
                    Send Reset Link
                  </Button>

                  <div className="cls-form-footer">
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="cls-back-link"
                      data-testid="button-back-login"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Login</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="cls-success-state">
                <div className="cls-success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2 className="cls-success-title">Check Your Email</h2>
                <p className="cls-success-message">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <p className="cls-success-note">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="cls-resend-link"
                    data-testid="button-resend"
                  >
                    try again
                  </button>
                  .
                </p>
                <Button
                  onClick={handleBackToLogin}
                  className="cls-submit-button"
                  data-testid="button-back-login-success"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
