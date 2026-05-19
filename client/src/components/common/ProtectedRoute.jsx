import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store.js";
import LoadingHeader from "./LoadingHeader";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

  if (isCheckingAuth) return <LoadingHeader />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
