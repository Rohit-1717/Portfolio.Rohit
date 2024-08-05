import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { logoutUser } from "../slices/authSlice";
import { uploadProfileImage, fetchProfileImage } from "../slices/profileSlice";
import { updateProject } from "../slices/projectsSlice";
import { updateMyStory } from "../slices/aboutSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const { image, status: profileStatus, error: profileError } = profile;

  const about = useSelector((state) => state.about);
  const { status: aboutStatus, error: aboutError } = about;

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [myStory, setMyStory] = useState("");

  useEffect(() => {
    dispatch(fetchProfileImage());
  }, [dispatch]);

  useEffect(() => {
    if (profileStatus === "loading") {
      toast.loading("Uploading profile image...", { id: "profile-upload" });
    } else if (profileStatus === "succeeded") {
      toast.success("Profile image uploaded successfully!", {
        id: "profile-upload",
      });
    } else if (profileStatus === "failed" && profileError) {
      toast.error(`Failed to upload profile image: ${profileError}`, {
        id: "profile-upload",
      });
    }
    // Reset status only after the action has been completed or failed
    if (profileStatus === "succeeded" || profileStatus === "failed") {
      dispatch({ type: "profile/resetStatus" });
    }
  }, [profileStatus, profileError, dispatch]);

  useEffect(() => {
    if (aboutStatus === "loading") {
      toast.loading("Updating story...", { id: "story-update" });
    } else if (aboutStatus === "succeeded") {
      toast.success("Story updated successfully!", { id: "story-update" });
    } else if (aboutStatus === "failed" && aboutError) {
      toast.error(`Failed to update story: ${aboutError}`, {
        id: "story-update",
      });
    }
    // Reset status only after the action has been completed or failed
    if (aboutStatus === "succeeded" || aboutStatus === "failed") {
      dispatch({ type: "about/resetStatus" });
    }
  }, [aboutStatus, aboutError, dispatch]);

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
    } catch (error) {
      console.error("Failed to upload profile image", error);
      toast.error("Failed to upload profile image");
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
      toast.success("Project uploaded successfully!");
    } catch (error) {
      console.error("Failed to update project", error);
      toast.error("Failed to upload project");
    }
  };

  const handleMyStorySubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateMyStory({ story: myStory })).unwrap();
      setMyStory("");
    } catch (error) {
      console.error("Failed to update My Story", error);
      toast.error("Failed to update My Story");
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
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm sm:text-base"
            >
              Logout
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-[#6E06F2]">Dashboard</h2>
          <p className="text-lg mb-6">
            Welcome, <span className="text-[#6E06F2] font-semibold">Rohit</span>
            !
          </p>

          {/* Profile Image */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 h-32 w-32 rounded-full shadow-lg ring-2 ring-blue-500">
                <img
                  src={image || "https://via.placeholder.com/128"}
                  alt="Profile"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2 w-full"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md w-full"
            >
              Upload Profile Image
            </button>
          </div>

          {/* Projects Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
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
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md w-full"
            >
              Add Project
            </button>
          </div>

          {/* Update My Story Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-gray-300">
            <h3 className="text-xl font-semibold mb-2">Update My Story</h3>
            <form onSubmit={handleMyStorySubmit}>
              <textarea
                value={myStory}
                onChange={(e) => setMyStory(e.target.value)}
                placeholder="Update your story here..."
                className="border p-2 rounded w-full bg-gray-100 h-32"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md w-full mt-4"
              >
                Update My Story
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
