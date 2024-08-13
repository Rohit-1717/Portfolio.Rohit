import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsWithoutAuth } from "../slices/projectsSlice"; // Adjust the path as necessary
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function ProjectCards() {
  const dispatch = useDispatch();
  const {
    data: projects,
    status,
    error,
  } = useSelector((state) => state.projects);

  // Define the titles you want to match
  const targetTitles = ["Portfolio Project", "Github Project", "Hey"];

  useEffect(() => {
    dispatch(fetchProjectsWithoutAuth());
  }, [dispatch]);

  // Filter projects based on multiple titles
  const filteredProjects = projects.filter(
    (project) => targetTitles.includes(project.title) // Check if project title is in the targetTitles array
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="font-['Montserrat'] ">
          <h1 className="pt-20 text-5xl lg:text-7xl font-extrabold text-[#24262F] lg:pt-28 md:text-[7.8vw]">
            My <span className="text-[#6E06F2]">Best</span> Creations
          </h1>
          <p className="text-xl leading-[6.5vw] lg:text-2xl text-[#4E525A] lg:w-[58vw] pt-4 md:text-2xl">
            Designing and Developing Robust and Stylish Web Applications for a
            Decade and Counting
          </p>
        </div>
        <div className="flex flex-col items-center">
          {status === "failed" && <div>Error: {error}</div>}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.35, 0.17, 0.3, 0.86] }}
                key={project.id}
                className="flex flex-col h-auto w-[90vw] bg-[#fff] rounded-md mb-6 mt-6 overflow-hidden"
              >
                <div className="h-[55vw] lg:h-[30vw] w-full md:h-[52vw]">
                  <img
                    className="object-cover object-center h-full w-full"
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="p-4">
                  <h1 className="text-2xl lg:text-5xl text-[#24262F] font-bold font-['Montserrat'] md:text-4xl">
                    <NavLink
                      to={project.liveLink}
                      className="hover:text-[#6E06F2]"
                    >
                      {project.title}
                    </NavLink>
                  </h1>
                  <p className="text-[#60646B] text-lg font-['Montserrat'] lg:text-2xl lg:mt-2 lg:p-2 md:text-xl md:mt-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div>No projects found with the specified titles</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectCards;
