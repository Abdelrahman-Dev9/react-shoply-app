import { Route, Routes } from "react-router-dom";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import NewPassword from "./pages/auth/NewPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/verifyCode" element={<VerifyCode />} />
      <Route path="/newPassword" element={<NewPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
