import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Dashboard = () => {
  const userName = "John Doe"; // Replace with the actual user's name from your state or context

  return (
    <>
      <Nav />
      <div className="p-4 sm:p-6 lg:p-8 font-['Montserrat']">
        <h2 className="text-2xl font-bold mb-4 text-[#6E06F2]">Dashboard</h2>
        <p className="text-lg mb-6">
          Welcome, <span className="text-[#6E06F2]">{userName}</span>!
        </p>

        {/* Profile Image */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
          <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 border-4 border-[#6E06F2] shadow-lg"></div>
          <button
            disabled
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed shadow-md"
          >
            Upload Profile Image
          </button>
        </div>

        {/* Skills */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <select
            disabled
            className="border p-2 rounded mb-2 w-full bg-gray-100 cursor-not-allowed"
          >
            <option>Select Skill Type</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Soft Skills</option>
          </select>
          <input
            type="text"
            disabled
            placeholder="Enter new skill"
            className="border p-2 rounded mb-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <button
            disabled
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed shadow-md"
          >
            Add Skill
          </button>
          <ul className="mt-4">
            <li className="bg-gray-100 p-2 rounded mb-1">Example Skill 1</li>
            <li className="bg-gray-100 p-2 rounded mb-1">Example Skill 2</li>
          </ul>
        </div>

        {/* Projects */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <input
            type="text"
            disabled
            placeholder="Project Title"
            className="border p-2 rounded mb-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <textarea
            disabled
            placeholder="Project Description"
            className="border p-2 rounded mb-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <input
            type="file"
            disabled
            className="mb-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <button
            disabled
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed shadow-md"
          >
            Add Project
          </button>
          <div className="mt-4">
            <div className="bg-gray-100 p-4 rounded mb-4 shadow-lg">
              <h4 className="text-lg font-semibold">Example Project Title</h4>
              <p>Example project description.</p>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Example Project"
                className="w-full h-auto mt-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <textarea
            disabled
            placeholder="Tell your story"
            className="border p-2 rounded mb-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <button
            disabled
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed shadow-md"
          >
            Update About Me
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
