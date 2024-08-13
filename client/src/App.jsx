import React, { useState, useEffect } from "react";
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
import LocomotiveScrollProvider from "./components/LocomotiveScrollProvider";
import axiosInstance from "./axiosConfig";

function App() {
  const isLaptop = useIsLaptop();
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Simulate progress increment
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10; // Increment progress
          });
        }, 200); // Simulate progress interval

        // Fetch initial data
        await axiosInstance.get("profile-image");
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <Router>
        {isLaptop && <Loader isLoading={isLoading} progress={progress} />}
        {isLaptop && <CustomCursor />}
        <LocomotiveScrollProvider>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LocomotiveScrollProvider>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
