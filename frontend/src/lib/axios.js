import axios from "axios";

// Prefer explicit Vite env `VITE_API_URL` when deployed.
// Fallback to localhost in dev, and `/api` (same-origin) in production.
const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : "/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
