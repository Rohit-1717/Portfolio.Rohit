import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { logoutUser } from "../slices/authSlice";
import { uploadProfileImage, fetchProfileImage } from "../slices/profileSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    image,
    status: profileStatus,
    error: profileError,
  } = useSelector((state) => state.profile);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchProfileImage());
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
      setSelectedFile(null); // Clear the selected file after upload
    } catch (error) {
      console.error("Failed to upload profile image", error);
    }
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
              <h4 className="text-lg font-semibold mb-2">
                Example Project Title
              </h4>
              <p className="mb-2">Example project description.</p>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Example Project"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
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
