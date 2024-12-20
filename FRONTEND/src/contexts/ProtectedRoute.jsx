import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvidor.jsx";

const ProtectedRoute = ({ children }) => {
  let { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
