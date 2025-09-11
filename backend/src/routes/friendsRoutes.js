const express = require("express");
const router = express.Router();
const {
  addFriend,
  getFriends,
  removeFirend,
  getFriendTasks,
} = require("../controllers/friends");
const auth = require("../middleware/auth");

router.post("/add", auth, addFriend);
router.post("/remove", auth, removeFirend);
router.get("/", auth, getFriends);
router.get("/:id/tasks", auth, getFriendTasks);

module.exports = router;
