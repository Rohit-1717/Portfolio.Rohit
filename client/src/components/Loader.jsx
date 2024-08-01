import { motion } from "framer-motion";
import React from "react";

function Loader() {
  return (
    <motion.div
      initial={{ y: "100", opacity: 1 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 4, ease: [0.65, 0, 0.35, 1] }}
      className="lg:absolute lg:z-[99999] bg-white h-screen w-full   flex items-center justify-center  flex-col"
    >
      {/* <img
        className="h-full w-full object-cover object-center"
        src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1722551199/My%20Portfolio%20Website%20Assets/bsjiytjdue0vv7sb9ozq.avif"
        alt=""
      /> */}
      <div className="flex items-center justify-center  flex-col lg:absolute ">
        <img
          src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1720439170/My%20Portfolio%20Website%20Assets/oixzuhp8nxj9ld8tkpdd.svg"
          alt="SVG Logo"
        />
        <svg
          className="w-[5vw] h-[5vw] -mt-[7vw]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle
            fill="#6E06F2"
            stroke="#6E06F2"
            stroke-width="15"
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
            stroke-width="15"
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
            stroke-width="15"
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
        </svg>
      </div>
    </motion.div>
  );
}

export default Loader;
