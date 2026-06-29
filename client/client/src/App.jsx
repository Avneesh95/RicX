import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/Otp";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/otp" element={<OTP />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;