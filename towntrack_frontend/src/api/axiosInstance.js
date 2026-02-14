import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure backend is running here
});

// Add token automatically to headers if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token; // your backend middleware expects 'Authorization'
  }
  return config;
});

export default axiosInstance;
