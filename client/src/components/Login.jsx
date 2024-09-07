import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../slices/authSlice";
import Nav from "./Nav";
import Footer from "./Footer";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { username, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Frontend validation
    if (!username && !password) {
      toast.error("Username and password are required.");
      return;
    }

    if (!username) {
      toast.error("Username is required.");
      return;
    }

    if (!password) {
      toast.error("Password is required.");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        // Debug: Check the resultAction payload
        // console.log("Login successful. Payload:", resultAction.payload);

        // Store the token in session storage
        localStorage.setItem("token", resultAction.payload.token);

        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        // Handle server-side errors from Redux
        const serverErrors = resultAction.payload?.errors || {};

        if (serverErrors.username) {
          toast.error(serverErrors.username);
        }

        if (serverErrors.password) {
          toast.error(serverErrors.password);
        }

        if (!serverErrors.username && !serverErrors.password) {
          toast.error("Failed to login. Please try again.");
        }
      }
    } catch (err) {
      // Handle unexpected errors
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
              alt="Admin Login"
            />
          </div>
          <div className="text-center font-['Montserrat']">
            <h1 className="font-semibold md:text-xl">Admin Login</h1>
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

            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 md:text-xl"
              >
                Log In
              </button>
            </div>

            <p className="mt-2 text-sm text-center text-gray-400 md:text-xl">
              <NavLink
                to="/forgot-password"
                className="font-medium text-gray-700 hover:underline"
              >
                Forgot Password?
              </NavLink>
            </p>
          </form>

          {/* <p className="mt-8 text-sm font-light text-center text-gray-400 md:text-xl">
            Don't have an account?{" "}
            <NavLink
              to="/"
              className="font-medium text-gray-700 hover:underline"
            >
              Create One
            </NavLink>
          </p> */}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
