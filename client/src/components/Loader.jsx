import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        return 100;
      });
    }, 40); // Adjust the speed of progress

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: "100", opacity: 1 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 4, ease: [0.65, 0, 0.35, 1] }}
      className="lg:absolute lg:z-[99999] bg-white h-screen w-full flex items-center justify-center flex-col font-['Montserrat']"
    >
      <div className="flex items-center justify-center flex-col lg:absolute">
        <img
          src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1720439170/My%20Portfolio%20Website%20Assets/oixzuhp8nxj9ld8tkpdd.svg"
          alt="SVG Logo"
        />
        {/* <svg
          className="w-[5vw] h-[5vw] -mt-[7vw]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle
            fill="#6E06F2"
            stroke="#6E06F2"
            strokeWidth="15"
            r="15"
            cx="40"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#6E06F2"
            stroke="#6E06F2"
            strokeWidth="15"
            r="15"
            cx="100"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#6E06F2"
            stroke="#6E06F2"
            strokeWidth="15"
            r="15"
            cx="160"
            cy="65"
          >
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg> */}
        <div className="mt-4 text-center w-1/2">
          <p className="text-lg font-semibold">{progress}%</p>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-[#6E06F2] rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Loader;
