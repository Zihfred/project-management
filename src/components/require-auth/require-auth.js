import React from "react";
import useAuth from "../../hooks/useAuth";
import { routes } from "../../App";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const auth = useAuth();
  if (auth.isLoading) return <div>Loading...</div>;
  return auth.user ? <Outlet /> : <Navigate to={routes.auth} />;
};

export default RequireAuth;
