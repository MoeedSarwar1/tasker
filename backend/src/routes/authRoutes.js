const express = require("express");
const { signup } = require("./controllers/auth");
const { login } = require("./controllers/login");
const auth = require("../middleware/auth");
const getTasks = require("../controllers/getTasks");

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/tasks", auth, getTasks);
Router.delete("/users/:user_id");
