import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import useIsLaptop from "./hooks/useDeviceType";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectsPage from "./components/ProjectsPage";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const isLaptop = useIsLaptop();
  const { user } = useSelector((state) => state.auth); // Get user state from Redux

  return (
    <>
      <Router>
        {isLaptop && <Loader />}
        {isLaptop && <CustomCursor />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/admin/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
