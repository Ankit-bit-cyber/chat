import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      ENV.CLIENT_URL?.replace(/\/$/, ""),
      "https://chat-7ypx.vercel.app",
      "https://chat-7ypx-5u43dqktx-ankit-kumars-projects-5420a0c1.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ].filter(Boolean),
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {}; // {userId:socketId}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
