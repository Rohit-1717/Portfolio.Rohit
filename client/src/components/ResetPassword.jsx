import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Nav from "./Nav";
import Footer from "./Footer";
import { resetPassword } from "../slices/authSlice";

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const { newPassword, confirmNewPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("New Password is required.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New Password must be at least 8 characters long.");
      return;
    }

    if (!confirmNewPassword) {
      toast.error("Confirm New Password is required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const resultAction = await dispatch(
        resetPassword({ token, password: newPassword })
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successful.");
        navigate("/login");
      } else {
        const serverErrors = resultAction.payload?.errors || {};

        if (serverErrors.password) {
          toast.error(serverErrors.password);
        } else if (serverErrors.token) {
          toast.error("Invalid or expired token.");
        } else {
          toast.error("Failed to reset password. Please try again.");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <section className="px-6 mt-10 mb-16">
        <div className="w-full max-w-sm p-6 m-auto bg-[#FCFCFD] rounded-lg border-2 border-[#C399F9] shadow-md">
          <div className="flex justify-center items-center mx-auto w-[18vw] h-[18vw] md:w-[10vw] md:h-[10vw] lg:w-[5vw] lg:h-[5vw] rounded-full border-2 border-[#C399F9]">
            <img
              className="w-auto h-10 sm:h-8 lg:h-[3.5vw] lg:w-[3.5vw] md:h-[6.5vw] md:w-[6.5vw]"
              src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1721224336/My%20Portfolio%20Website%20Assets/cam4pfycuoha5sno1rus.gif"
              alt="Reset Password"
            />
          </div>
          <div className="text-center font-['Montserrat']">
            <h1 className="font-semibold md:text-xl">Reset Password</h1>
          </div>
          <form className="mt-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
                placeholder="Enter your new password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={onChange}
                placeholder="Confirm your new password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 md:text-xl"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ResetPassword;
