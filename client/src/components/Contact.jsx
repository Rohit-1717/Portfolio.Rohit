import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { CgMail } from "react-icons/cg";
import { FaXTwitter } from "react-icons/fa6";
import ProfileImage from "./ProfileImage";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

function Contact() {
  return (
    <>
      <Nav />
      <div className="w-full bg-[#FCFCFD] px-6">
        <div className="Get In Touch font-['Montserrat'] py-12">
          <h1 className="pb-5 text-4xl font-extrabold text-[#24262F] font-['Montserrat'] lg:text-6xl lg:font-extrabold md:text-6xl">
            Get In Touch
            <span className="text-5xl h-fit w-fit text-[#6E06F2]">.</span>
          </h1>
          <p className="text-[#4E525A] text-lg md:text-2xl lg:pr-[50%]">
            Hello there! I'm open to collaboration opportunities. Feel free to
            reach out to discuss potential projects or partnerships. Drop me a
            message, and I'll respond within 24 hours. Looking forward to
            connecting with you!
          </p>
        </div>
        <div className="contacts flex items-center gap-4 mb-5">
          <a
            href="mailto:rohit.developer0523@gmail.com"
            className="flex items-center text-[#4E525A] text-[5vw] font-[600] md:text-2xl"
          >
            <div className="w-10 h-10 p-2 border border-[#4E525A] text-[#24262F] text-5xl rounded-full flex items-center justify-center">
              <CgMail />
            </div>
            <span className="ml-2">rohit.developer0523@gmail.com</span>
          </a>
        </div>
        <div className="contacts flex items-center gap-4 mb-5">
          <a
            href="https://x.com/rohitVish_1717"
            target="_blank"
            className="flex items-center text-[#4E525A] text-[5vw] font-[600] md:text-2xl"
          >
            <div className="w-10 h-10 p-2 border border-[#4E525A] text-[#24262F] text-5xl rounded-full flex items-center justify-center">
            <FaXTwitter />
            </div>
            <span className="ml-2">Twitter</span>
          </a>
        </div>
        <div className="contacts flex items-center gap-4 mb-5">
          <a
            href="https://www.linkedin.com/in/rohit-vishwakarma-aa2522293/"
            target="_blank"
            className="flex items-center text-[#4E525A] text-[5vw] font-[600]  md:text-2xl"
          >
            <div className="w-10 h-10 p-2 border border-[#4E525A] text-[#24262F] text-xl rounded-full flex items-center justify-center">
              <FaLinkedinIn />
            </div>
            <span className="ml-2">LinkedIn</span>
          </a>
        </div>

        <div className="contacts flex items-center gap-4 mb-5">
          <a
            href="https://www.instagram.com/develop.your_web?utm_source=qr&igsh=dWZzNmFvaGs5OG9m"
            target="_blank"
            className="flex items-center text-[#4E525A] text-[5vw] font-[600]  md:text-2xl"
          >
            <div className="w-10 h-10 p-2 border border-[#4E525A] text-[#24262F] text-xl rounded-full flex items-center justify-center">
              <IoLogoInstagram />
            </div>
            <span className="ml-2">Instagram</span>
          </a>
        </div>
      </div>

      <div className="md:absolute md:top-[45%] md:left-[60%] lg:top-[15%]">
        <ProfileImage />
      </div>
      <Footer />
    </>
  );
}

export default Contact;
