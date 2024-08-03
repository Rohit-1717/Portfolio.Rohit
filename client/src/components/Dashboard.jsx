import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { logoutUser } from "../slices/authSlice";
import { uploadProfileImage, fetchProfileImage } from "../slices/profileSlice";
import { updateProject } from "../slices/projectsSlice";
import {
  fetchSkills,
  updateSkills,
  fetchSkillsWithoutAuth,
} from "../slices/skillsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const skills = useSelector((state) => state.skills);

  const { image, status: profileStatus, error: profileError } = profile;
  const {
    data: skillsList = [],
    status: skillsStatus,
    error: skillsError,
  } = skills;

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("frontend");
  const [editSkillId, setEditSkillId] = useState(null);

  useEffect(() => {
    dispatch(fetchProfileImage());
    dispatch(fetchSkills());
    dispatch(fetchSkillsWithoutAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      await dispatch(uploadProfileImage(formData)).unwrap();
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to upload profile image", error);
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setProjectTitle(value);
    else if (name === "description") setProjectDescription(value);
  };

  const handleProjectImageChange = (e) => {
    setProjectImage(e.target.files[0]);
  };

  const handleProjectUpload = async () => {
    if (!projectTitle || !projectDescription || !projectImage) return;

    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("image", projectImage);

    try {
      await dispatch(updateProject(formData)).unwrap();
      setProjectTitle("");
      setProjectDescription("");
      setProjectImage(null);
      setUploadSuccess("Project uploaded successfully!");
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  const handleSkillSubmit = async () => {
  if (!skillName) return;

  // Create skill entry
  const skillEntry = { name: skillName, _id: editSkillId || undefined };

  // Prepare the skillData object to include the updated list for the specific category
  const skillData = {
    frontend: skillCategory === 'frontend' ? [skillEntry] : [],
    backend: skillCategory === 'backend' ? [skillEntry] : [],
    softSkills: skillCategory === 'softSkills' ? [skillEntry] : [],
  };

  try {
    // Ensure the backend is expecting this structure
    await dispatch(updateSkills(skillData)).unwrap();
    
    // Provide appropriate success message
    if (editSkillId) {
      setUploadSuccess("Skill updated successfully!");
    } else {
      setUploadSuccess("Skill added successfully!");
    }

    // Reset form fields
    setSkillName("");
    setSkillCategory("frontend");
    setEditSkillId(null);
  } catch (error) {
    console.error("Failed to submit skill", error);
  }
};

const handleEditSkill = (skill) => {
  setSkillName(skill.name);
  setSkillCategory(skill.category);
  setEditSkillId(skill._id);
};

const handleCategoryChange = (e) => {
  setSkillCategory(e.target.value);
};

const handleSkillChange = (e) => {
  setSkillName(e.target.value);
};


  return (
    <>
      <Nav />
      <div className="relative p-4 sm:p-6 lg:p-8 font-['Montserrat']">
        {/* Logout Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded shadow-md text-sm sm:text-base"
          >
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#6E06F2]">Dashboard</h2>
        <p className="text-lg mb-6">
          Welcome, <span className="text-[#6E06F2] font-semibold">Rohit</span>!
        </p>

        {/* Profile Image */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
          <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 shadow-lg ring-2 ring-blue-500">
            <img
              src={image || "https://via.placeholder.com/128"}
              alt="Profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
          >
            Upload Profile Image
          </button>
          {profileStatus === "loading" && <p>Uploading...</p>}
          {profileError && <p className="text-red-500">{profileError}</p>}
        </div>

        {/* Projects Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <input
            type="text"
            name="title"
            value={projectTitle}
            onChange={handleProjectChange}
            placeholder="Project Title"
            className="border p-2 rounded mb-2 w-full bg-gray-100"
          />
          <textarea
            name="description"
            value={projectDescription}
            onChange={handleProjectChange}
            placeholder="Project Description"
            className="border p-2 rounded mb-2 w-full bg-gray-100"
          />
          <input
            type="file"
            onChange={handleProjectImageChange}
            className="mb-2 w-full bg-gray-100"
          />
          <button
            onClick={handleProjectUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
          >
            Add Project
          </button>
          {uploadSuccess && <p className="text-green-500">{uploadSuccess}</p>}
        </div>

        {/* Skills Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <select
            value={skillCategory}
            onChange={handleCategoryChange}
            className="border p-2 rounded mb-2 w-full bg-gray-100"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="softSkills">Soft Skills</option>
          </select>
          <input
            type="text"
            value={skillName}
            onChange={handleSkillChange}
            placeholder="Skill Name"
            className="border p-2 rounded mb-2 w-full bg-gray-100"
          />
          <button
            onClick={handleSkillSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
          >
            {editSkillId ? "Update Skill" : "Add Skill"}
          </button>
          {uploadSuccess && <p className="text-green-500">{uploadSuccess}</p>}
          {skillsStatus === "loading" && <p>Loading...</p>}
          {skillsError && <p className="text-red-500">{skillsError}</p>}
          <ul className="mt-4">
            {skillsList && skillsList.length > 0 ? (
              skillsList.map((skill) => (
                <li
                  key={skill._id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    {skill.name} ({skill.category})
                  </span>
                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </li>
              ))
            ) : (
              <li>No skills available.</li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
