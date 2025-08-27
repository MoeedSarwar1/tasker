const express = require("express");

const Router = express.Router();
const {
  fetchAllTasks,
  addTask,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../controllers/tasks");

Router.get("/", fetchAllTasks);
Router.post("/", addTask);
Router.delete("/:id", deleteTask);
Router.get("/:id", getSingleTask);
Router.patch("/:id", updateTask);

module.exports = Router;
