const { Server } = require("socket.io");

let io;
const onlineUsers = new Map(); // userId -> socketId

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("users:online", Array.from(onlineUsers.keys()));
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
      console.log("Online users:", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("users:online", Array.from(onlineUsers.keys()));
          console.log(`❌ User ${userId} disconnected`);
          console.log("Online users:", Array.from(onlineUsers.keys()));
          break;
        }
      }
    });
  });

  return io;
};

const getIo = () => {
  if (!io) throw new Error("❌ Socket.io not initialized!");
  return io;
};

module.exports = { initSocket, getIo, onlineUsers };
