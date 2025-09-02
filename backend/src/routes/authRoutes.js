const express = require("express");
const {
  signup,
  loginUser,
  getSingleUser,
  fetchAllUsers,
} = require("../controllers/auth.js");

const Router = express.Router();

Router.post("/register", signup);
Router.post("/login", loginUser);
Router.get("/:userID", getSingleUser);
Router.get("/", fetchAllUsers);

module.exports = Router;
