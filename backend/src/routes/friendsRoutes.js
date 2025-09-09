const express = require("express");
const router = express.Router();
const {
  addFriend,
  getFriends,
  removeFirend,
} = require("../controllers/friends");
const auth = require("../middleware/auth");

router.post("/add", auth, addFriend);
router.post("/remove", auth, removeFirend);
router.get("/", auth, getFriends);

module.exports = router;
