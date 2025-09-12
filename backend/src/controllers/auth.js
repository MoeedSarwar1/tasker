const User = require("../models/userSchema");
const avatar = require("gradient-avatar");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }
    const svgAvatar = avatar(firstName + email);

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      avatar: svgAvatar,
    });
    await newUser.save();

    res.json({
      message: "User registered successfully",
      user: {
        firstName: newUser.firstName,
        email: newUser.email,
        lastName: newUser.lastName,
        avatar: svgAvatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.json({
      token,
      user: {
        firstName: user.firstName,
        email: user.email,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { fetchMe, signup, loginUser, fetchAllUsers, getSingleUser };
