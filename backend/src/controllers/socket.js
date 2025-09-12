import { Server } from "socket.io";

let io;
const onlineUsers = new Map(); // userId -> socketId

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "*" }, // tighten in prod
  });

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`❌ User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("❌ Socket.io not initialized!");
  return io;
};

export { onlineUsers };
