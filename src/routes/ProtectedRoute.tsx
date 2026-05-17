import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = isAuthenticated();

  if (!auth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "You must login first" }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
