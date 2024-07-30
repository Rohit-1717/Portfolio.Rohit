import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ProjectCards from "./ProjectCards";

function ProjectsPage() {
  return (
    <>
      <Nav />
      <div className="flex items-center justify-center px-6">
        <ProjectCards />
      </div>
      <Footer />
    </>
  );
}

export default ProjectsPage;
