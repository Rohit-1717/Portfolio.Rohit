import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/admin/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// No need for an Authorization header since the token is in a cookie
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
