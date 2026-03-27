import { Route, Routes } from "react-router-dom";

import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import NewPassword from "./pages/auth/NewPassword";
import VerifyCode from "./pages/auth/VerifyCode";

import {
  default as Dashboard,
  default as DashboardLayout,
} from "./pages/Dashboard/Dashboard";
import OrderList from "./pages/Dashboard/OrderList";
import ProductsPage from "./pages/Dashboard/Products";
import UsersPage from "./pages/Dashboard/Users";
import AdminsPage from "./pages/Dashboard/Admins";
import CategoryPage from "./pages/Dashboard/Category";
import NotificationsPage from "./pages/Dashboard/Notification";
import ReportsPage from "./pages/Dashboard/Report";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/verifyCode" element={<VerifyCode />} />
      <Route path="/newPassword" element={<NewPassword />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/admins" element={<AdminsPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
