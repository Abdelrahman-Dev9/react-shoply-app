import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const auth = isAuthenticated();

  useEffect(() => {
    if (!auth) {
      alert("You must login first");
    }
  }, [auth]);

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
