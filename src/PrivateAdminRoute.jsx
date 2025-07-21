import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const PrivateAdminRoute = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  const isAdmin = user?.roles?.includes("admin"); // or use "realm_admin" or any custom role

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRoute;
