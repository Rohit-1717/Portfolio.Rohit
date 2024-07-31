// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfileImage } from "../slices/profileSlice";
import { updateSkills, fetchSkills } from "../slices/skillsSlice";
import { updateProjects, fetchProjects } from "../slices/projectsSlice";
import { updateAbout, fetchAbout } from "../slices/aboutSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: skills } = useSelector((state) => state.skills);
  const { data: projects } = useSelector((state) => state.projects);
  const { data: about } = useSelector((state) => state.about);
  const [profileImage, setProfileImage] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [myStory, setMyStory] = useState(about?.story || "");

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchProjects());
    dispatch(fetchAbout());
  }, [dispatch]);

  const handleProfileImageUpload = () => {
    const formData = new FormData();
    formData.append("image", profileImage);
    dispatch(uploadProfileImage(formData));
  };

  const handleAddSkill = () => {
    dispatch(updateSkills({ skill: newSkill }));
    setNewSkill("");
  };

  const handleAddProject = () => {
    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("image", newProject.image);
    dispatch(updateProjects(formData));
    setNewProject({ title: "", description: "", image: null });
  };

  const handleAboutUpdate = () => {
    dispatch(updateAbout({ story: myStory }));
  };

  return (
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
          placeholder="Enter skill"
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAddSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Skill
        </button>
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
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAddProject}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Project
        </button>
      </div>

      {/* About */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <textarea
          value={myStory}
          onChange={(e) => setMyStory(e.target.value)}
          placeholder="My Story"
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAboutUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Update About
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
