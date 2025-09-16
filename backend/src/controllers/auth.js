const User = require("../models/userSchema");
const avatar = require("gradient-avatar");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../middleware/verificationEmail");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    // check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // avatar + hash
    const svgAvatar = avatar(firstName + email);
    const hash = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // create unverified user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      avatar: svgAvatar,
      code: verificationCode,
      isVerified: false,
    });

    await sendVerificationEmail(email, verificationCode);
    await newUser.save();

    res.status(201).json({
      message: "Signup successful, please verify your email",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.code !== parseInt(code)) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // mark verified
    user.isVerified = true;
    user.code = null; // clear code
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 🚨 Block unverified users
    if (!user.isVerified) {
      const now = new Date();

      // check if a code was sent recently
      if (
        user.verificationCodeSentAt &&
        now - user.verificationCodeSentAt < 60 * 1000
      ) {
        return res.status(429).json({
          message:
            "Verification code already sent. Please wait 1 minute before requesting again.",
        });
      }

      // generate new code
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();

      user.code = newCode;
      user.verificationCodeSentAt = now;
      await user.save();

      // resend email
      await sendVerificationEmail(user.email, newCode);

      return res.status(403).json({
        message:
          "Please verify your email first. A new verification code has been sent.",
      });
    }

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
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
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
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(404).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
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

module.exports = {
  signup,
  verifyEmail,
  loginUser,
  fetchAllUsers,
  getSingleUser,
  fetchMe,
};
