import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "./index.css";
import { AuthProvider } from "./components/hooks/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Dark gradient radial-style background for a premium feel */}
        <div className="bg-gradient-to-br from-[#1a1025] via-[#0d0d1a] to-black min-h-screen text-gray-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
