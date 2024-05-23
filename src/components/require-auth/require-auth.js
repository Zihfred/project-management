import React from "react";
import useAuth from "../../hooks/useAuth";
import { routes } from "../../App";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to={routes.auth} />;
};

export default RequireAuth;
