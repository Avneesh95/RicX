import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/Register";
import OTP from "./pages/Otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/otp" element={<OTP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;