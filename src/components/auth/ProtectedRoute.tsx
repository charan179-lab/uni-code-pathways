
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // For debugging
  useEffect(() => {
    console.log('ProtectedRoute:', { user, loading, path: location.pathname });
  }, [user, loading, location.pathname]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-campusBridge-blue mb-4" />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
