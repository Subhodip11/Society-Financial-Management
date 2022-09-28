import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ cookie, children }) => {
  if (
    cookie.get("isAuthenticated") === "false" ||
    cookie.get("isAuthenticated") === undefined
  ) {
    return <Navigate replace to="/loginAdmin" />;
  } else if (cookie.get("isAuthenticated") === "true") {
    return children;
  }
};

export default ProtectedRoute;
