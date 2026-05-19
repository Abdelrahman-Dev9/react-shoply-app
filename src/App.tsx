import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgetPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import NewPassword from "./pages/auth/NewPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

const DashboardLayout   = lazy(() => import("./pages/Dashboard/Layout"));
const DashboardHome     = lazy(() => import("./pages/Dashboard/DashboardHome"));
const ProductsPage      = lazy(() => import("./pages/Dashboard/Products"));
const UsersPage         = lazy(() => import("./pages/Dashboard/Users"));
const AdminsPage        = lazy(() => import("./pages/Dashboard/Admins"));
const CategoryPage      = lazy(() => import("./pages/Dashboard/Category"));
const NotificationsPage = lazy(() => import("./pages/Dashboard/Notification"));
const ReportsPage       = lazy(() => import("./pages/Dashboard/Report"));
const ProfileAdmin      = lazy(() => import("./pages/Dashboard/Profile"));
const OrderList         = lazy(() => import("./pages/Dashboard/OrderList"));

const DashboardFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader2 className="animate-spin text-[#1e3a8a]" size={32} />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/newPassword" element={<NewPassword />} />

        {/* PROTECTED DASHBOARD ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Suspense fallback={<DashboardFallback />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route path="/dashboard"     element={<DashboardHome />} />
            <Route path="/products"      element={<ProductsPage />} />
            <Route path="/users"         element={<UsersPage />} />
            <Route path="/admins"        element={<AdminsPage />} />
            <Route path="/categories"    element={<CategoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/reports"       element={<ReportsPage />} />
            <Route path="/profile"       element={<ProfileAdmin />} />
            <Route path="/orderList"     element={<OrderList />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
