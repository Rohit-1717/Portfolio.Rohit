import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Projects from "./Projects";
import { easeIn, easeInOut, motion } from "framer-motion";
import ProfileImage from "./ProfileImage";
import Skills from "./Skills";

function Home() {
  return (
    <>
      <Nav />

      <div className=" bg-[#FCFCFD] h-full md:h-[65vh]  lg:h-screen  w-full relative px-6 lg:mt-24">
        <div className="hidden md:block lg:block">
          <ProfileImage />
        </div>
        <div className="w-fit p-2 mt-10 overflow-hidden  flex font-['Montserrat'] md:mt-12 mb-4">
          <h2 className="text-[#4E525A]  text-2xl tracking-tighter md:text-3xl">
            Hey, I'm Rohit <span>👋🏻</span>
          </h2>
        </div>
        <div>
          <div className="bg w-fit p-2 overflow-hidden ">
            <motion.h1
              initial={{ y: "100%", opacity: 0.6 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              className="font-extrabold text-5xl font-['Montserrat'] text-[#24262F] md:text-6xl lg:text-7xl"
            >
              <span className="text-[#6E06F2]">Full</span> Stack
            </motion.h1>
          </div>
          <div className="bg w-fit p-2 overflow-hidden font-['Montserrat']">
            <motion.h1
              initial={{ y: "100%", opacity: 0.6 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              className="text-[#24262F] font-extrabold text-5xl md:text-6xl lg:text-7xl"
            >
              Developer
            </motion.h1>
          </div>
        </div>

        <div className="font-['Montserrat'] mt-7  md:w-[56.5vw]">
          <p className="text-lg leading-[7.2vw] tracking-tight text-[#24262F] md:leading-[4vw] lg:leading-[2.5vw] lg:w-[52vw] lg:text-xl">
            As a full stack developer based in India, I specialize in crafting
            sophisticated and user-centric websites that leave a lasting
            impression.
          </p>
        </div>
        <div className="flex gap-4 overflow-hidden mt-6 ">
          <Link
            to="/contact"
            className="flex justify-center items-center border h-11  w-full text-white bg-[#8A37F5] font-bold  rounded-lg md:w-[25vw]  lg:w-[12vw] lg:h-[3.6vw]"
          >
            Get In Touch
          </Link>
          <Link
            to="/projects"
            className="flex justify-center items-center border  h-11 w-full text-zinc-600  border-black font-bold text-sm rounded-lg md:w-[25vw] lg:w-[12vw] lg:h-[3.6vw]"
          >
            Browse Projects
          </Link>
        </div>
      </div>
      <div className="md:hidden ">
        <ProfileImage />
      </div>
      <Projects />
      <Skills />
      <Footer />
    </>
  );
}

export default Home;
