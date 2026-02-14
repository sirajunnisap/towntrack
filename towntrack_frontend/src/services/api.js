import axios from "axios";

// Use the environment variable
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default API