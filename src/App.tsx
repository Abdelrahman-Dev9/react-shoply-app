import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyCode from "./pages/auth/VerifyCode";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/verifyCode" element={<VerifyCode />} />
    </Routes>
  );
};

export default App;
