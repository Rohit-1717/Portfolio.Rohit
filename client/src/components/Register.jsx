import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../slices/authSlice";
import Nav from "./Nav";
import Footer from "./Footer";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, fullName, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, fieldErrors } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Collecting frontend errors
    let errors = [];

    if (!username) {
      errors.push("Username is required");
      hasError = true;
    }

    if (!fullName) {
      errors.push("Full Name is required");
      hasError = true;
    }

    if (!email) {
      errors.push("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      errors.push("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      errors.push("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
      hasError = true;
    }

    if (!confirmPassword) {
      errors.push("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.push("Passwords do not match");
      hasError = true;
    }

    // Displaying frontend validation errors
    if (hasError) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({ username, fullName, email, password })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful!");
        navigate("/admin/dashboard");
      } else {
        // Handling backend validation errors
        if (resultAction.payload?.errors) {
          Object.values(resultAction.payload.errors).forEach((message) =>
            toast.error(message)
          );
        } else {
          toast.error("Failed to register. Please try again.");
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
              src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1721227284/My%20Portfolio%20Website%20Assets/ghyh8kjye7zxpub9qtar.png"
              alt="Logo"
            />
          </div>
          <div className="text-center font-['Montserrat']">
            <h1 className="font-semibold md:text-xl">Register</h1>
          </div>
          <form className="mt-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter Username"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="fullName"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={onChange}
                placeholder="Enter Full Name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
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
                placeholder="Enter Email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-800 font-['Montserrat'] md:text-xl"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 md:text-xl"
              />
            </div>

            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 md:text-xl"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm font-light text-center text-gray-400 md:text-xl">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-medium text-gray-700 hover:underline"
            >
              Log In
            </NavLink>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
