import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://chatty-6p5w.onrender.com/api" ,
  withCredentials: true,
});
