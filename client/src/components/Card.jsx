import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const items = [
  {
    id: 1,
    title: "Project 1",
    subtitle: "Project Description 1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Project 2",
    subtitle: "Project Description 2",
    image:
      "https://images.unsplash.com/photo-1511367734837-f2956f0d8020?q=80&w=1405&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Project 3",
    subtitle: "Project Description 3",
    image:
      "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?q=80&w=1389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Project 4",
    subtitle: "Project Description 4",
    image:
      "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Project 5",
    subtitle: "Project Description 5",
    image:
      "https://images.unsplash.com/photo-1525829528215-ffae12a76ac8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Project 6",
    subtitle: "Project Description 6",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    title: "Project 7",
    subtitle: "Project Description 7",
    image:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    title: "Project 8",
    subtitle: "Project Description 8",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    title: "Project 9",
    subtitle: "Project Description 9",
    image:
      "https://images.unsplash.com/photo-1559087316-47ce212113b7?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    id: 10,
    title: "Project 10",
    subtitle: "Project Description 10",
    image:
      "https://images.unsplash.com/photo-1559144490-8328294facd8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    title: "Project 11",
    subtitle: "Project Description 11",
    image:
      "https://images.unsplash.com/photo-1611179892587-26e9518c90d8?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    title: "Project 12",
    subtitle: "Project Description 12",
    image:
      "https://images.unsplash.com/photo-1600802856212-3188b29afa7c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Card() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id.toString()}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer"
          >
            <motion.div className="h-[50vw] bg-white overflow-hidden rounded-lg shadow-lg md:h-[24vw] lg:h-[20vw]">
              <motion.img
                className="w-full h-full object-cover object-center"
                src={item.image}
                alt=""
              />
            </motion.div>
            <motion.h5 className="mt-2 text-center text-lg font-semibold">
              {item.subtitle}
            </motion.h5>
            <motion.h2 className="mt-1 text-center text-xl font-bold">
              {item.title}
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
                src={items.find((item) => item.id === selectedId)?.image}
                alt=""
              />
              <motion.h5 className="mt-4 text-lg font-semibold text-center">
                {items.find((item) => item.id === selectedId)?.subtitle}
              </motion.h5>
              <motion.h2 className="mt-2 text-xl font-bold text-center">
                {items.find((item) => item.id === selectedId)?.title}
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
