const express = require("express");
const router = express.Router();
const {
  getFriends,
  removeFriend,
  getFriendTasks,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getReceivedRequests,
} = require("../controllers/friends");
const auth = require("../middleware/auth");

router.post("/request/send", auth, sendFriendRequest);
router.get("/request/received", auth, getReceivedRequests);
router.put("/request/:requestId/accept", auth, acceptFriendRequest);
router.put("/request/:requestId/reject", auth, rejectFriendRequest);
router.post("/remove", auth, removeFriend);
router.get("/", auth, getFriends);
router.get("/:id/tasks", auth, getFriendTasks);

module.exports = router;
