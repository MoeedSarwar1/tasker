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
Router.delete("/:id", auth, deleteTask);
Router.get("/:id", auth, getSingleTask);
Router.patch("/:id", auth, updateTask);

module.exports = Router;
