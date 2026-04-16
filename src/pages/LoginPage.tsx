import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Brain, Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const result = await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName
        });

        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Registration failed');
        }
      } else {
        const result = await login(formData.email, formData.password);

        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Login failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">MindSkill<span className="gradient-text">AI</span></span>
        </Link>

        <h1 className="font-display text-3xl font-extrabold mb-2">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isSignUp ? "Start your adaptive learning journey." : "Continue your learning journey."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-200 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="button"
            className="w-full glass-card flex items-center justify-center gap-3 rounded-xl p-3 text-sm font-semibold hover:shadow-md transition-all"
            disabled={isSubmitting}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              disabled={isSubmitting}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={isSubmitting}
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              disabled={isSubmitting}
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> {isSignUp ? "Create Account" : "Sign In"}
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setFormData({ email: '', password: '', fullName: '' });
              }}
              className="text-sm text-primary hover:underline"
              disabled={isSubmitting}
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        {/* Predefined Credentials Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p><strong>Students:</strong> student1@webdev.mindskill.ai (webdev2024)</p>
            <p><strong>Teachers:</strong> teacher1@mindskill.ai (teacher2024)</p>
            <p><strong>Admins:</strong> admin@mindskill.ai (admin2024)</p>
          </div>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center gradient-hero-bg p-12">
        <div className="max-w-md text-primary-foreground text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground/20 backdrop-blur-sm">
            <Brain className="h-10 w-10" />
          </div>
          <h2 className="font-display text-3xl font-extrabold mb-4">Learning That Understands You</h2>
          <p className="text-primary-foreground/80 leading-relaxed">AI-powered adaptive education that responds to your skills, emotions, and career goals in real-time.</p>
        </div>
      </div>
    </div>
  );
}
