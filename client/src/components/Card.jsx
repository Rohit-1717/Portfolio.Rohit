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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Ensure projects is an array before attempting to map over it
  const projectItems = Array.isArray(projects) ? projects : [];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
        {projectItems.map((project) => (
          <motion.div
            key={project._id}
            layoutId={project._id.toString()}
            onClick={() => setSelectedId(project._id)}
            className="cursor-pointer"
          >
            <motion.div className="h-[50vw] bg-white overflow-hidden rounded-lg shadow-lg md:h-[24vw] lg:h-[20vw]">
              <motion.img
                className="w-full h-full object-cover object-center"
                src={project.image} // Updated field based on your schema
                alt={project.title}
              />
            </motion.div>
            <motion.h5 className="mt-2 text-center text-lg font-semibold">
              {project.description} {/* Assuming subtitle is description */}
            </motion.h5>
            <motion.h2 className="mt-1 text-center text-xl font-bold">
              {project.title}
            </motion.h2>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId.toString()}
            className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <motion.img
                className="h-48 w-full object-cover object-center rounded-lg"
                src={
                  projectItems.find((project) => project._id === selectedId)
                    ?.image
                }
                alt={
                  projectItems.find((project) => project._id === selectedId)
                    ?.title
                }
              />
              <motion.h5 className="mt-4 text-lg font-semibold text-center">
                {
                  projectItems.find((project) => project._id === selectedId)
                    ?.description
                }
              </motion.h5>
              <motion.h2 className="mt-2 text-xl font-bold text-center">
                {
                  projectItems.find((project) => project._id === selectedId)
                    ?.title
                }
              </motion.h2>
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
