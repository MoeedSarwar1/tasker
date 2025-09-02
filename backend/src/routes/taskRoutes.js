const express = require("express");
const auth = require("../middleware/auth");

const Router = express.Router();
const {
  fetchAllTasks,
  addTask,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../controllers/tasks");

Router.get("/", auth, fetchAllTasks);
Router.post("/", auth, addTask);
Router.delete("/:taskID", auth, deleteTask);
Router.get("/:taskID", auth, getSingleTask);
Router.patch("/:taskID", auth, updateTask);

module.exports = Router;
