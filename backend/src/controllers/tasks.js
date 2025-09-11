const Task = require("../models/taskSchema");
const mongoose = require("mongoose");

const fetchAllTasks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("❌ No user found in request:", req.user);
      return res.status(401).json({ error: "Unauthorized - no user ID" });
    }

    console.log("✅ Decoded user from JWT:", req.user);

    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("❌ Invalid ObjectId:", userId);
      return res.status(400).json({ error: "Invalid user ID" });
    }

    console.log("🔍 Fetching tasks for userId:", userId);

    const tasks = await Task.find({ user: userID })
      .populate("user", "firstName lastName _id")
      .sort({ createdAt: -1 });

    console.log("✅ Found tasks:", tasks.length);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("🔥 Error fetching tasks:", error.message, error.stack);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { taskID } = req.params; // match route param
    const userId = req.user.id; // Assuming auth middleware sets req.user
    const task = await Task.findById({ _id: taskID, user: userId });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate, priority, assignedTo } =
      req.body;
    const { id: userID } = req.user; // Assuming auth middleware sets req.user
    const newTask = new Task({
      title,
      description,
      completed,
      user: userID,
      dueDate,
      priority,
      assignedTo,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.params; // match route param
    const userId = req.user.id; // assuming `auth` middleware sets this

    console.log("Deleting task:", taskID, "for user:", userId);

    const task = await Task.findOneAndDelete({
      _id: taskID,
      user: userId,
    });

    if (!task) {
      console.log("Deleting task:", taskID, "for user:", userId);
      return res.status(404).json({
        error: "Task not found or not authorized",
        _id: taskID,
        userId,
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskID } = req.params; // from URL
    const userId = req.user.id; // set by auth middleware
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID, user: userId }, // ✅ match by ID + user
      { title, description, completed },
      { new: true }, // ✅ return the updated task
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

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
