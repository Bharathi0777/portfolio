import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { portfolioApi } from '../services/api.ts';
import { Loading } from './Loading.tsx';

interface AdminProtectedProps {
  children: React.ReactNode;
}

export const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('portfolio_admin_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const isValid = await portfolioApi.checkAuth();
        setIsAuthenticated(isValid);
      } catch {
        localStorage.removeItem('portfolio_admin_token');
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading message="Authenticating administrator session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
