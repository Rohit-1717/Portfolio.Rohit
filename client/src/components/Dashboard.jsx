import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfileImage } from "../slices/profileSlice";
import { updateSkills, fetchSkills } from "../slices/skillsSlice";
import { updateProjects, fetchProjects } from "../slices/projectsSlice";
import { updateAbout, fetchAbout } from "../slices/aboutSlice";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.data) || []; // Default to empty array if null
  const projects = useSelector((state) => state.projects.data) || []; // Default to empty array if null
  const about = useSelector((state) => state.about.data) || {}; // Default to empty object if null
  const [profileImage, setProfileImage] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [myStory, setMyStory] = useState(about.story || ""); // Default to empty string if null or undefined

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchAbout());
  }, [dispatch]);

  const handleProfileImageUpload = () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      dispatch(uploadProfileImage(formData));
    }
  };

  const handleAddSkill = () => {
    if (newSkill) {
      dispatch(updateSkills({ skill: newSkill }));
      setNewSkill("");
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      if (newProject.image) formData.append("image", newProject.image);
      dispatch(updateProjects(formData));
      setNewProject({ title: "", description: "", image: null });
    }
  };

  const handleAboutUpdate = () => {
    dispatch(updateAbout({ story: myStory }));
  };

  return (
    <>
      <Nav />
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Profile Image */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="mb-2 w-full"
          />
          <button
            onClick={handleProfileImageUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Profile Image
          </button>
        </div>

        {/* Skills */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <select
            onChange={(e) => setNewSkill(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          >
            <option value="">Select Skill Type</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="softskills">Soft Skills</option>
          </select>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter new skill"
            className="border p-2 rounded mb-2 w-full"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Skill
          </button>
          <ul className="mt-4">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded mb-1">
                  {skill}
                </li>
              ))
            ) : (
              <li>No skills available</li>
            )}
          </ul>
        </div>

        {/* Projects */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            placeholder="Project Title"
            className="border p-2 rounded mb-2 w-full"
          />
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="Project Description"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewProject({ ...newProject, image: e.target.files[0] })
            }
            className="mb-2 w-full"
          />
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
          <div className="mt-4">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded mb-4">
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p>{project.description}</p>
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-auto"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No projects available</p>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <textarea
            value={myStory}
            onChange={(e) => setMyStory(e.target.value)}
            placeholder="Tell your story"
            className="border p-2 rounded mb-2 w-full"
          />
          <button
            onClick={handleAboutUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
