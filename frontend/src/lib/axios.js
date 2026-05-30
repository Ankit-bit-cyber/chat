import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  import.meta.env.MODE === "development" ? "https://chat-49y9.vercel.app/api" : "/api",
  withCredentials: true,
});
