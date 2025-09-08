const express = require("express");
const router = express.Router();
const { addFriend, getFriends } = require("../controllers/friends");
const auth = require("../middleware/auth");

router.post("/add", auth, addFriend);
router.get("/", auth, getFriends);

module.exports = router;
