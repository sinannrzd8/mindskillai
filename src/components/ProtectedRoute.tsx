import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/lib/database';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: User['role'][];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireAuth = true
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access login page
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.role === 'admin' ? '/admin' :
                        user.role === 'teacher' ? '/teacher-dashboard' :
                        '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

// Role-specific route components for convenience
export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['teacher']} requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']} requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requireAuth={false}>
    {children}
  </ProtectedRoute>
);