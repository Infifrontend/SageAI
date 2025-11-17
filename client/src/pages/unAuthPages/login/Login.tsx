import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import authIllustration from '@assets/generated_images/Auth_page_side_illustration_6a131ae3.png';
import './login.scss';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, rememberMe });
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
              <h2 className="cls-illustration-title">Welcome to Sage App</h2>
              <p className="cls-illustration-subtitle">
                Secure, intuitive, and designed for your success
              </p>
            </div>
          </div>
        </div>

        <div className="cls-auth-form-panel">
          <div className="cls-form-container">
            <div className="cls-form-header">
              <h1 className="cls-page-title">Sign In</h1>
              <p className="cls-page-subtitle">
                Enter your credentials to access your account
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

              <div className="cls-form-group">
                <Label htmlFor="password" className="cls-form-label">
                  Password
                </Label>
                <div className="cls-input-wrapper">
                  <Lock className="cls-input-icon" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cls-form-input cls-password-input"
                    required
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cls-password-toggle"
                    aria-label="Toggle password visibility"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="cls-form-options">
                <div className="cls-remember-me">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    data-testid="checkbox-remember"
                  />
                  <Label htmlFor="remember" className="cls-checkbox-label">
                    Remember me
                  </Label>
                </div>
                <a href="/forgot-password" className="cls-forgot-link" data-testid="link-forgot-password">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="cls-submit-button"
                data-testid="button-signin"
              >
                Sign In
              </Button>

              <div className="cls-form-footer">
                <p className="cls-footer-text">
                  Don't have an account?{' '}
                  <a href="/signup" className="cls-signup-link" data-testid="link-signup">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
