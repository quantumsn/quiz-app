import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvidor.jsx";

const AlreadyLogged = ({ children }) => {
  let { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default AlreadyLogged;
