import React from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaReddit } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { TbBrandDiscordFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* <a href="#">
            <img
              className="w-auto h-7"
              src=""
              alt="Logo"
            />
          </a> */}

          <h1 className="text-zinc-400 text-2xl text-bold ">Rohit.Dev</h1>
          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-sm text-blue-500 transition-colors duration-300"
                  : "mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-sm text-blue-500 transition-colors duration-300"
                  : "mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-sm text-blue-500 transition-colors duration-300"
                  : "mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }
            >
              Teams
            </NavLink>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-sm text-blue-500 transition-colors duration-300"
                  : "mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }
            >
              Privacy
            </NavLink>
            <NavLink
              to="/cookies"
              className={({ isActive }) =>
                isActive
                  ? "mx-4 text-sm text-blue-500 transition-colors duration-300"
                  : "mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }
            >
              Cookies
            </NavLink>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            © Copyright 2024. All Rights Reserved.
          </p>
          <div className="flex -mx-2 text-lg">
            <a
              href="https://www.linkedin.com/in/rohit-vishwakarma-aa2522293/"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/develop.your_web?utm_source=qr&igsh=dWZzNmFvaGs5OG9m"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/rohitVish_1717"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="X.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.reddit.com/user/Rohit_Dev0707/"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Reddit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaReddit />
            </a>

            <a
              href="https://discordapp.com/users/rohit.dev1717/"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandDiscordFilled />
            </a>
            <NavLink
              to="/login"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Admin"
            >
              <RiAdminFill />
            </NavLink>
          </div>
          <div className="text-white text-sm mt-1 ">
            <p>Made with ❤️ by Rohit.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
