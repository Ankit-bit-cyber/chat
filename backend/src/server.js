import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// CORS configuration that handles multiple origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman, or mobile apps)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      ENV.CLIENT_URL?.replace(/\/$/, ""), // Remove trailing slash if present
      "https://chat-7ypx.vercel.app",
      "https://chat-7ypx-5u43dqktx-ankit-kumars-projects-5420a0c1.vercel.app",
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // Local development
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors(corsOptions));
app.use(cookieParser());


app.get("/api", (req, res) => {
  res.status(200).json({ message: "Chatify API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
