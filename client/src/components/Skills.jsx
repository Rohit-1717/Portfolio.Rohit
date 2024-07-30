import React from "react";
import Typewriter from "typewriter-effect";

function Skills() {
  const skills = {
    skill: ["frontend", "backend", "softSkills"],
    frontend: [
      "Javascript",
      "ReactJS",
      "NextJS",
      "CSS3",
      "HTML5",
      "TailwindCSS",
    ],
    backend: ["NodeJS", "MongoDB", "ExpressJS", "Vercel"],
    softSkills: [
      "Effective communication",
      "Collaboration",
      "Commitment",
      "Leadership",
    ],
  };

  return (
    <>
      <div className="bg-[#FCFCFD]  w-full px-6">
        <div className="w-full py-6 ">
          <h1 className="text-5xl text-[#24262F] font-bold font-['Montserrat'] flex items-center lg:font-extrabold">
            S{" "}
            <span className="text-[#6E06F2]">
              <Typewriter
                options={{
                  strings: ["kills."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
            {/* <span className="text-5xl  h-fit w-fit text-[#6E06F2]">.</span> */}
          </h1>
        </div>
        <div className="flex flex-col h-full w-full font-['Montserrat'] lg:flex-row lg:justify-between">
          {skills.skill.map((skillCategory, index) => (
            <div key={index}>
              <h2 className="text-2xl text-[#24262F] font-bold ">
                {skillCategory.charAt(0).toUpperCase() + skillCategory.slice(1)}
              </h2>
              <div className="py-4 flex flex-col  ">
                {skills[skillCategory].map((skill, idx) => (
                  <p
                    key={idx}
                    className="text-xl  text-[#4E525A] md:text-2xl lg:text-xl"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Skills;
