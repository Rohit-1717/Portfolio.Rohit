import React from "react";
import { motion } from "framer-motion";
import useMediaQuery from "react-responsive";

function StackMarque() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const stacks = [
    [
      "React",
      "JavaScript",
      "TypeScript",
      "Nodejs",
      "Express",
      "Postman",
      "Github",
    ],
    ["HTML", "CSS", "TailwindCSS", "Bootstrap", "GSAP", "Framer Motion", "JWT"],
    ["MongoDB", "PostgreSQL", "MySQL", "WEBRTC", "SocketIO", "JAVA", "NPM"],
  ];

  const techIcons = {
    React: "https://img.icons8.com/plasticine/400/react.png",
    JavaScript: "https://img.icons8.com/color/480/javascript--v1.png",
    TypeScript: "https://img.icons8.com/fluency/240/typescript--v1.png",
    Postman: "https://cdn.worldvectorlogo.com/logos/postman.svg",
    Github: "https://img.icons8.com/ios-filled/50/ffffff/github.png",
    Nodejs: "https://img.icons8.com/color/144/nodejs.png",
    Express: "https://img.icons8.com/nolan/64/express-js.png",
    HTML: "https://img.icons8.com/color/480/html-5--v1.png",
    CSS: "https://img.icons8.com/color/480/css3.png",
    TailwindCSS: "https://img.icons8.com/color/480/tailwind_css.png",
    Bootstrap: "https://img.icons8.com/fluency/240/bootstrap.png",
    GSAP: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
    "Framer Motion": "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
    JWT: "https://cdn.worldvectorlogo.com/logos/jwt-3.svg",
    MongoDB:
      "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/384/external-mongodb-a-cross-platform-document-oriented-database-program-logo-shadow-tal-revivo.png",
    PostgreSQL: "https://img.icons8.com/color/480/postgreesql.png",
    MySQL: "https://img.icons8.com/color/480/mysql-logo.png",
    WEBRTC: "https://cdn.worldvectorlogo.com/logos/webrtc.svg",
    SocketIO: "https://cdn.worldvectorlogo.com/logos/socket-io.svg",
    JAVA: "https://cdn.worldvectorlogo.com/logos/java-14.svg",
    NPM: "https://cdn.worldvectorlogo.com/logos/npm-square-red-1.svg",
    RestAPI: "https://img.icons8.com/nolan/512/api-settings.png",
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-gray-800 to-black p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl overflow-hidden">
      {/* 3D Background Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
          animate={
            !isMobile
              ? {
                  rotateX: [0, 10, -10, 0],
                  rotateY: [0, -10, 10, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={
            !isMobile ? { duration: 30, repeat: Infinity, ease: "linear" } : {}
          }
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Main Marquee */}
      <div className="relative flex flex-col items-center gap-6 sm:gap-8 perspective-1000">
        {stacks.map((stack, index) => (
          <motion.div
            key={index}
            className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide transform-style-preserve-3d"
            animate={
              !isMobile
                ? {
                    x: index % 2 === 0 ? ["100%", "-100%"] : ["-100%", "100%"],
                  }
                : {}
            }
            transition={
              !isMobile
                ? {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 15 - index * 3,
                      ease: "linear",
                    },
                  }
                : {}
            }
            style={{
              transform: `rotateX(${index * 5}deg) rotateY(${index * 5}deg)`,
            }}
          >
            {stack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  backgroundColor: "#333333",
                  color: "#ffeb3b",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.8)",
                }}
                whileTap={{ scale: 1.1, rotate: 3 }}
                className="flex bg-transparent px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-700 hover:shadow-2xl hover:cursor-pointer transform transition duration-300 ease-in-out items-center justify-center"
                aria-label={tech}
              >
                <img
                  src={
                    techIcons[tech] ||
                    "https://img.icons8.com/ios-filled/50/ffffff/question-mark.png"
                  }
                  alt={tech}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
                <span className="ml-2">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* 3D Light Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={
            !isMobile ? { opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] } : {}
          }
          transition={
            !isMobile
              ? {
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      </div>
    </div>
  );
}

export default StackMarque;
