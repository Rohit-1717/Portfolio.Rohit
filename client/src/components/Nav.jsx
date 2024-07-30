import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-[#FCFCFD] shadow dark:bg-gray-800 font-['Montserrat'] text-xl">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <h1 className="text-gray-800 text-2xl font-bold dark:text-white font-['Montserrat']">
              Rohit.Dev
            </h1>
          </NavLink>

          {/* Mobile menu button */}
          <div className="flex lg:hidden md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className=" flex flex-col md:flex-row md:mx-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? " my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400 md:hidden"
              }
            >
              Contact
            </NavLink>

            <NavLink
              target="_blank"
              to="https://drive.google.com/file/d/1bZ5F8SdBgaB7uwc_ZPop5nWpDBkj_hcM/view?usp=sharinghttps://drive.google.com/drive/folders/15l-CzZpPEfOaHafUDF0-juymmcI8sMRi"
              className={({ isActive }) =>
                isActive
                  ? " my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400 md:hidden"
              }
            >
              Resume
            </NavLink>

            <NavLink
              to="https://github.com/Rohit-1717"
              target="_blank"
              className={({ isActive }) =>
                isActive
                  ? " my-1 text-blue-500 transition-colors duration-300 transform md:mx-4 md:my-0"
                  : "my-1 text-gray-800 dark:text-gray-200 transition-colors duration-300 transform md:mx-4 md:my-0 hover:text-blue-500 dark:hover:text-blue-400 md:hidden"
              }
            >
              Github
            </NavLink>
          </div>
        </div>

        {/* Contact icons visible on medium and larger screens */}
        <div className="hidden md:flex gap-4">
          <NavLink
            to={
              "https://drive.google.com/file/d/1bZ5F8SdBgaB7uwc_ZPop5nWpDBkj_hcM/view?usp=sharinghttps://drive.google.com/drive/folders/15l-CzZpPEfOaHafUDF0-juymmcI8sMRi"
            }
            target="_blank"
            className="text-gray-800 dark:text-gray-200 text-3xl"
          >
            <IoIosPaper />
          </NavLink>
          <NavLink
            to="https://github.com/Rohit-1717"
            target="_blank"
            className="text-gray-800 dark:text-gray-200 text-3xl"
          >
            <FaGithub />
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-800 dark:text-gray-200 text-3xl"
          >
            <SiGooglemessages />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
