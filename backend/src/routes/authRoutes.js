const auth = require("../middleware/auth");

const express = require("express");
const {
  signup,
  loginUser,
  getSingleUser,
  fetchAllUsers,
  fetchMe,
  verifyEmail,
} = require("../controllers/auth.js");

const Router = express.Router();

Router.post("/register", signup);
Router.post("/login", loginUser);
Router.post("/verify", verifyEmail);
Router.get("/", fetchAllUsers); // list all users
Router.get("/me", auth, fetchMe); // list all users
Router.get("/:userID", getSingleUser);

module.exports = Router;
