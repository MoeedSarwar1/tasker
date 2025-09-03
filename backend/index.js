const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");
const authRoutes = require("./src/routes/authRoutes");
require("dotenv").config();

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/tasks", taskRoutes);

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
