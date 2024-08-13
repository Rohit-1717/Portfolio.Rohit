import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsWithoutAuth } from "../slices/projectsSlice";

function Card() {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const {
    data: projects,
    status,
    error,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjectsWithoutAuth());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  const projectItems = Array.isArray(projects) ? projects : [];
  const sortedProjects = [...projectItems].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 font-['Montserrat'] ">
        {sortedProjects.map((project) => (
          <motion.div
            key={project._id}
            layoutId={project._id.toString()}
            onClick={() => setSelectedId(project._id)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 "
          >
            <motion.div className="h-[50vw] bg-white overflow-hidden rounded-lg shadow-lg md:h-[24vw] lg:h-[20vw]">
              <motion.img
                className="w-full h-full object-cover object-center"
                src={project.image}
                alt={project.title}
              />
            </motion.div>
            <div className="p-4">
              <motion.h2 className="text-lg font-bold text-gray-800 text-center">
                {project.title}
              </motion.h2>
              <motion.h5 className="mt-2 text-sm font-semibold text-gray-600 text-center">
                {project.description}
              </motion.h5>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId.toString()}
            className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full p-6 font-['Montserrat']">
              <motion.img
                className="w-full object-cover object-center rounded-lg"
                src={
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.image
                }
                alt={
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.title
                }
              />
              <motion.h2 className="mt-4 text-xl font-bold text-gray-800 text-center">
                {
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.title
                }
              </motion.h2>
              <motion.h5 className="mt-2 text-sm text-gray-600 text-center">
                {
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.description
                }
              </motion.h5>
              <div className="mt-6 flex justify-center space-x-4">
                <motion.a
                  href={
                    sortedProjects.find((project) => project._id === selectedId)
                      ?.liveLink
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6E06F2] text-white px-4 py-2 rounded-md"
                  onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
                >
                  Visit
                </motion.a>
                <motion.a
                  href={
                    sortedProjects.find((project) => project._id === selectedId)
                      ?.githubLink
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md  transition-colors"
                  onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
                >
                  GitHub
                </motion.a>
              </div>
              <motion.button
                onClick={() => setSelectedId(null)}
                className="absolute text-3xl top-2 right-2 text-white bg-[#6c06f2dc] hover:bg-[#6c06f2] px-3 py-3 rounded-full focus:outline-none"
              >
                <IoCloseCircleSharp />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Card;
