// About.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyStoryWithoutAuth } from "../slices/aboutSlice";
import Nav from "./Nav";
import Footer from "./Footer";

function About() {
  const dispatch = useDispatch();
  const { story, status, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchMyStoryWithoutAuth());
  }, [dispatch]);

  const details = {
    id1: {
      title: "My Stack.",
      image:
        "https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    id2: {
      title: "My Special Place.",
      image:
        "https://images.unsplash.com/photo-1469532844423-7e9107f9a96f?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  };

  return (
    <>
      <Nav />
      <div className="w-full bg-[#FCFCFD] px-6">
        <div className="pr-8 pt-20">
          <h1 className="pb-5 text-6xl font-extrabold text-[#24262F] font-['Montserrat'] lg:text-7xl lg:font-extrabold md:text-6xl">
            About me
            <span className="text-5xl h-fit w-fit text-[#6E06F2]">.</span>
          </h1>
        </div>

        <div className="h-36 w-full flex gap-2 md:h-16 lg:w-[90vw]">
          <div className="w-5 h-full bg-[#6E06F2] md:w-3 lg:w-3"></div>
          <div className="text-[#4E525A] text-xl md:text-2xl">
            <p>
              Developing beautiful and functional websites is what I love doing,
              and that's why I give my all in every new challenge.
            </p>
          </div>
        </div>

        {Object.keys(details).map((key) => {
          const item = details[key];
          return (
            <div key={key}>
              <div className="w-full text-xl font-['Montserrat'] font-bold mt-14 pb-4 md:text-3xl">
                <h2>{item.title}</h2>
              </div>
              <div className="h-[70vw] w-full bg-green-300 flex items-center justify-center rounded-md mb-4 overflow-hidden md:h-[40vw] lg:h-[30vw]">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          );
        })}

        <section>
          <h1 className="text-4xl mt-9 font-extrabold text-[#24262F] font-['Montserrat'] lg:text-7xl lg:font-extrabold md:text-5xl">
            My Story
            <span className="text-5xl h-fit w-fit text-[#6E06F2]">.</span>
          </h1>

          {status === "loading" && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {status === "succeeded" && story && (
            <p className="text-[#24262F] font-['Montserrat'] pt-3 text-lg mb-8 md:text-xl">
              {story}
            </p>
          )}
          {status === "idle" && !story && (
            <p className="text-gray-500">No story available.</p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;
