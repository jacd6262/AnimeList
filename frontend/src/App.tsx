import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      {/* Dark gradient radial-style background for a premium feel */}
      <div className="bg-gradient-to-br from-[#1f1f1f] via-[#101010] to-black min-h-screen text-gray-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
