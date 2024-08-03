import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import Nav from "./Nav";
import Footer from "./Footer";
import { forgotPassword } from "../slices/authSlice"; // Assuming you have this action in authSlice

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState("");
  const { email, captchaInput } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.random().toString(36).substr(2, 6);
    setCaptcha(randomCaptcha.toUpperCase());
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!captchaInput) {
      toast.error("CAPTCHA is required.");
      return;
    }

    if (captchaInput.toUpperCase() !== captcha) {
      toast.error("CAPTCHA is incorrect.");
      generateCaptcha(); // Regenerate CAPTCHA on error
      return;
    }

    try {
      const resultAction = await dispatch(forgotPassword({ email }));

      if (forgotPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset instructions sent to your email.");
        navigate("/login");
      } else {
        const serverErrors = resultAction.payload?.errors || {};

        if (serverErrors.email) {
          toast.error(serverErrors.email);
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
          <div className="flex justify-center items-center mx-auto w-[18vw] h-[18vw] md:w-[10vw] md:h-[10vw] lg:w-[5vw] lg:h-[5vw] rounded-full border-2 border-[#C399F9] overflow-hidden">
            <img
              className="w-auto h-10 sm:h-8 lg:h-[3.5vw] lg:w-[3.5vw] md:h-[6.5vw] md:w-[6.5vw]"
              src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1722588427/My%20Portfolio%20Website%20Assets/zrk2kgnbgtmlzxas5mvn.gif"
              alt="Forgot Password"
            />
          </div>
          <div className="text-center font-['Montserrat']">
            <h1 className="font-semibold md:text-xl">Forgot Password</h1>
          </div>
          <form className="mt-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your Email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="captcha"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                CAPTCHA
              </label>
              <div className="flex items-center mt-2">
                <div className="px-4 py-2 bg-gray-200 border rounded-lg text-xl font-mono select-none">
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="ml-4 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                name="captchaInput"
                value={captchaInput}
                onChange={onChange}
                placeholder="Enter CAPTCHA"
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

            <p className="mt-2 text-sm text-center text-gray-400 md:text-xl">
              <NavLink
                to="/login"
                className="font-medium text-gray-700 hover:underline"
              >
                Remembered your password? Log in
              </NavLink>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ForgotPassword;
