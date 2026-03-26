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
        <Route path="/admins" element={<div>Admins</div>} />
        <Route path="/categories" element={<div>Categories</div>} />
        <Route path="/notifications" element={<div>Notifications</div>} />
        <Route path="/reports" element={<div>Reports</div>} />
      </Route>
    </Routes>
  );
};

export default App;
