import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useIsLaptop from "./hooks/useDeviceType";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectsPage from "./components/ProjectsPage";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  const isLaptop = useIsLaptop();
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
