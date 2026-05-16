import { Route, Routes } from "react-router-dom";

import DashboardHome from "./pages/Dashboard/DashboardHome";
import AdminsPage from "./pages/Dashboard/Admins";
import CategoryPage from "./pages/Dashboard/Category";
import DashboardLayout from "./pages/Dashboard/Layout";
import NotificationsPage from "./pages/Dashboard/Notification";
import OrderList from "./pages/Dashboard/OrderList";
import ProductsPage from "./pages/Dashboard/Products";
import ProfileAdmin from "./pages/Dashboard/Profile";
import ReportsPage from "./pages/Dashboard/Report";
import UsersPage from "./pages/Dashboard/Users";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/admins" element={<AdminsPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfileAdmin />} />
          <Route path="/orderList" element={<OrderList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
