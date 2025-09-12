const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");
const friendRoutes = require("./src/routes/friendsRoutes");
const http = require("http");
const { initSocket } = require("./src/controllers/socket.js");

require("dotenv").config();

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);

app.use("/api/users/tasks", taskRoutes);
app.use("/api/users", authRoutes);
app.use("/api/friends", friendRoutes);

initSocket(httpServer);

mongoose

  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
