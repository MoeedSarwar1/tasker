const Task = require("../models/taskSchema");
const mongoose = require("mongoose");

export const fetchAllTasks = async (req, res) => {
  try {
    const userId = req.user._id; // JWT middleware should attach user object

    // Find tasks where 'user' matches the authenticated user's ID
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { id: userID } = req.user; // Assuming auth middleware sets req.user
    const newTask = new Task({ title, description, completed, user: userID });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true },
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  fetchAllTasks,
  addTask,
  deleteTask,
  updateTask,
  getSingleTask,
};
