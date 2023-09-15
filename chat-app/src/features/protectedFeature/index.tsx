import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const isAuthenticated = localStorage.getItem('user');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;