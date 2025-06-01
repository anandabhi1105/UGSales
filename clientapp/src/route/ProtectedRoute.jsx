import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const ProtectedRoute = ({ element: Component }) => {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
