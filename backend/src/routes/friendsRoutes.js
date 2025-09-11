const express = require("express");
const router = express.Router();
const {
  getFriends,
  removeFirend,
  getFriendTasks,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getReceivedRequests,
} = require("../controllers/friends");
const auth = require("../middleware/auth");

router.post("/request/send", auth, sendFriendRequest);
router.get("/request/", auth, getReceivedRequests);
router.put("/request/:requestId/accept", auth, acceptFriendRequest);
router.put("/request/:requestId/reject", auth, rejectFriendRequest);
router.post("/remove", auth, removeFirend);
router.get("/", auth, getFriends);
router.get("/:id/tasks", auth, getFriendTasks);

module.exports = router;
