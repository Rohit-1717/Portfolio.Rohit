import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { logoutUser } from "../slices/authSlice";
import { uploadProfileImage, fetchProfileImage } from "../slices/profileSlice";
import {
  updateProject,
  deleteProject,
  fetchProjects,
} from "../slices/projectsSlice";
import { updateMyStory } from "../slices/aboutSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const { image, status: profileStatus, error: profileError } = profile;

  const projects = useSelector((state) => state.projects);
  const {
    data: projectData,
    status: projectsStatus,
    error: projectsError,
  } = projects;

  const about = useSelector((state) => state.about);
  const { status: aboutStatus, error: aboutError } = about;

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [projectGithubLink, setProjectGithubLink] = useState("");
  const [projectLiveLink, setProjectLiveLink] = useState("");
  const [myStory, setMyStory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

  useEffect(() => {
    dispatch(fetchProfileImage());
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (
      profileStatus === "loading" ||
      aboutStatus === "loading" ||
      projectsStatus === "loading"
    ) {
      toast.loading("Loading data...", { id: "dashboard-loading" });
    } else if (
      profileStatus === "succeeded" ||
      aboutStatus === "succeeded" ||
      projectsStatus === "succeeded"
    ) {
      toast.dismiss("dashboard-loading");
    } else if (
      profileStatus === "failed" ||
      aboutStatus === "failed" ||
      projectsStatus === "failed"
    ) {
      toast.dismiss("dashboard-loading");
      toast.error("Failed to load data. Please try again.");
    }
  }, [profileStatus, aboutStatus, projectsStatus]);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      toast.success("Logged out successfully!");
      navigate("/");
    });
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
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload profile image");
    }
  };

  const handleProjectUpload = async () => {
    if (!projectTitle || !projectDescription || !projectImage) return;

    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", projectDescription);
    formData.append("image", projectImage);
    formData.append("githubLink", projectGithubLink);
    formData.append("liveLink", projectLiveLink);

    try {
      await dispatch(updateProject(formData)).unwrap();
      setProjectTitle("");
      setProjectDescription("");
      setProjectImage(null);
      setProjectGithubLink("");
      setProjectLiveLink("");
      toast.success("Project uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload project");
    }
  };

  const handleMyStorySubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateMyStory({ story: myStory })).unwrap();
      setMyStory("");
      toast.success("Story updated successfully!");
    } catch (error) {
      toast.error("Failed to update My Story");
    }
  };

  const openDeleteModal = (projectId, projectTitle) => {
    setSelectedProjectId(projectId);
    setSelectedProjectTitle(projectTitle);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setSelectedProjectId(null);
    setSelectedProjectTitle("");
  };

  const handleDeleteProject = async () => {
    if (selectedProjectId) {
      try {
        await dispatch(deleteProject(selectedProjectId)).unwrap();
        toast.success("Project deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete project");
      } finally {
        closeDeleteModal();
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col font-['Montserrat']">
        <div className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
          {/* Logout Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm sm:text-base hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-[#6E06F2]">Dashboard</h2>
          <p className="text-lg mb-6 text-[#24262F]">
            Welcome, <span className="text-[#6E06F2] font-semibold">Rohit</span>
            !
          </p>

          {/* Profile Image */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-2 text-[#24262F]">
              Profile Image
            </h3>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 h-32 w-32 rounded-full shadow-lg ring-2 ring-[#6E06F2]">
                <img
                  src={image || "default-profile-image.png"}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleUpload}
              className="bg-[#6E06F2] text-white px-4 py-2 rounded shadow-md w-full"
            >
              Upload
            </button>
          </div>

          {/* Projects Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-2 text-[#24262F]">
              Projects
            </h3>
            <div className="mb-4">
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project Title"
                className="border p-2 rounded w-full mb-2"
              />
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Project Description"
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProjectImage(e.target.files[0])}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                value={projectGithubLink}
                onChange={(e) => setProjectGithubLink(e.target.value)}
                placeholder="GitHub Link"
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                value={projectLiveLink}
                onChange={(e) => setProjectLiveLink(e.target.value)}
                placeholder="Live Link"
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={handleProjectUpload}
                className="bg-[#6E06F2] text-white px-4 py-2 rounded shadow-md w-full "
              >
                Add Project
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {projectData && projectData.length > 0 ? (
                projectData.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-300"
                  >
                    <span className="text-lg font-semibold text-[#24262F]">
                      {project.title}
                    </span>
                    <button
                      onClick={() =>
                        openDeleteModal(project._id, project.title)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No projects available.
                </p>
              )}
            </div>
          </div>
          

          {/* Update My Story Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-2 text-[#24262F]">
              Update My Story
            </h3>
            <form onSubmit={handleMyStorySubmit}>
              <textarea
                value={myStory}
                onChange={(e) => setMyStory(e.target.value)}
                placeholder="Update your story here..."
                className="border p-2 rounded w-full bg-gray-100 h-32"
              />
              <button
                type="submit"
                className="bg-[#6E06F2] text-white px-4 py-2 rounded shadow-md w-full mt-4 "
              >
                Update My Story
              </button>
            </form>
          </div>
        </div>
        <Footer />
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteProject}
          projectTitle={selectedProjectTitle}
        />
      </div>
    </>
  );
};

export default Dashboard;
