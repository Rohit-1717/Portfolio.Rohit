import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsWithoutAuth } from "../slices/projectsSlice";

function Card() {
  const [selectedId, setSelectedId] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const dispatch = useDispatch();
  const {
    data: projects,
    status,
    error,
  } = useSelector((state) => state.projects);

  const imageRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProjectsWithoutAuth());
  }, [dispatch]);

  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageDimensions({
        width: naturalWidth,
        height: naturalHeight,
      });
    }
  }, [selectedId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const projectItems = Array.isArray(projects) ? projects : [];
  const sortedProjects = [...projectItems].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 ">
        {sortedProjects.map((project) => (
          <motion.div
            key={project._id}
            layoutId={project._id.toString()}
            onClick={() => setSelectedId(project._id)}
            className="cursor-pointer"
          >
            <motion.div
              className="bg-white overflow-hidden rounded-lg shadow-lg "
              style={{
                width: imageDimensions.width || "auto",
                height: imageDimensions.height || "auto",
              }}
            >
              <motion.img
                ref={imageRef}
                className="w-full h-full object-cover object-center"
                src={project.image}
                alt={project.title}
              />
            </motion.div>
            <motion.h5 className="mt-2 text-center text-lg font-bold">
              {project.title}
            </motion.h5>
            <motion.h2 className="mt-1 text-center text-xl font-semibold">
              {project.description}
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
            <motion.div className="relative bg-white rounded-lg shadow-lg p-6">
              <motion.img
                className="object-cover object-center rounded-lg"
                style={{
                  width: imageDimensions.width || "auto",
                  height: imageDimensions.height || "auto",
                }}
                src={
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.image
                }
                alt={
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.title
                }
              />
              <motion.h5 className="mt-4 text-lg font-semibold text-center">
                {
                  sortedProjects.find((project) => project._id === selectedId)
                    ?.description
                }
              </motion.h5>
              <motion.h2 className="mt-2 text-xl font-bold text-center">
                {
                  sortedProjects.find((project) => project._id === selectedId)
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
