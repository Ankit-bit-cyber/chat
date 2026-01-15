import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chatty-6p5w.onrender.com" : "/api",
  withCredentials: true,
});
