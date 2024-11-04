import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProps } from "../../types";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default Auth;
