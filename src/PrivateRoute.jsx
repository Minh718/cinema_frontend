import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
