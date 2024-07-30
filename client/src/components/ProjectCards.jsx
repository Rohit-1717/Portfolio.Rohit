import React from "react";
import { motion, transform } from "framer-motion";

function ProjectCards() {
  const ProjectDets = [
    {
      id: 1,
      projectImage:
        "https://images.unsplash.com/photo-1549925245-8a7a48495212?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectTitle: "This is dummy title 1.",
      projectDescription: "This is dummy description 1.",
    },
    {
      id: 2,
      projectImage:
        "https://images.unsplash.com/photo-1719550371336-7bb64b5cacfa?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectTitle: "This is dummy title 2.",
      projectDescription: "This is dummy description 2.",
    },
    {
      id: 3,
      projectImage:
        "https://images.unsplash.com/photo-1717579425304-3329b79030a9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectTitle: "This is dummy title 3.",
      projectDescription: "This is dummy description 3.",
    },
    {
      id: 4,
      projectImage:
        "https://images.unsplash.com/photo-1719565921375-c272b8ee132c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      projectTitle: "This is dummy title 4.",
      projectDescription: "This is dummy description 4.",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="font-['Montserrat'] ">
          <h1 className="pt-20 text-5xl lg:text-7xl font-extrabold text-[#24262F] lg:pt-28 md:text-[7.8vw]">
            My <span className="text-[#6E06F2]">Best</span> Creations
          </h1>
          <p className="text-xl leading-[6.5vw] lg:text-2xl text-[#4E525A]   lg:w-[58vw] pt-4 md:text-2xl">
            Designing and Developing Robust and Stylish Web Applications for a
            Decade and Counting
          </p>
        </div>
        <div className="flex flex-col items-center">
          {ProjectDets.map((project) => (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.35, 0.17, 0.3, 0.86] }}
              key={project.id}
              className="flex flex-col h-auto w-[90vw] bg-[#fff]  rounded-md mb-6 mt-6 overflow-hidden "
            >
              <div className="h-[55vw] lg:h-[30vw] w-full md:h-[52vw]">
                <img
                  className="object-cover object-center h-full w-full"
                  src={project.projectImage}
                  alt={project.projectTitle}
                />
              </div>
              <div className="p-4">
                <h1 className="text-2xl lg:text-5xl text-[#24262F] font-bold font-['Montserrat'] md:text-4xl">
                  {project.projectTitle}
                </h1>
                <p className="text-[#60646B] text-lg font-['Montserrat'] lg:text-2xl  lg:mt-2 lg:p-2 md:text-xl md:mt-2">
                  {project.projectDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectCards;
