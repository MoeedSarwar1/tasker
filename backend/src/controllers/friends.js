const User = require("../models/userSchema.js");
const Task = require("../models/taskSchema.js");
const FriendRequest = require("../models/friendRequests.js");

/**
 * Send Friend Request
 */
exports.sendFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;

    const friend = await User.findOne({ email: email.trim() });
    if (!friend) return res.status(404).json({ message: "User not found" });

    if (friend.id.toString() === userId) {
      return res.status(400).json({ message: "You can't add yourself" });
    }

    // Already friends?
    const user = await User.findById(userId);
    if (user.friends.includes(friend.id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Existing request?
    const existingRequest = await FriendRequest.findOne({
      sender: userId,
      receiver: friend.id,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = new FriendRequest({
      sender: userId,
      receiver: friend.id,
    });

    await request.save();

    // 🔔 Notify receiver if online
    const receiverSocket = global.onlineUsers.get(friend.id.toString());
    if (receiverSocket) {
      global.io.to(receiverSocket).emit("friends:request:received", {
        request: {
          _id: request._id,
          sender: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });
    }

    res.status(200).json({ message: "Friend request sent", request });
  } catch (err) {
    console.error("❌ Error sending friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Received Requests
 */
exports.getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Reject Friend Request
 */
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    // 🔔 Notify sender if online
    const senderSocket = global.onlineUsers.get(request.sender.toString());
    if (senderSocket) {
      global.io.to(senderSocket).emit("friends:request:rejected", {
        requestId: request._id,
      });
    }

    res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    console.error("❌ Error rejecting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Accept Friend Request
 */
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    await request.save();

    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.receiver);

    // Add friends (prevent duplicates)
    if (!sender.friends.includes(receiver.id)) sender.friends.push(receiver.id);
    if (!receiver.friends.includes(sender.id)) receiver.friends.push(sender.id);

    await sender.save();
    await receiver.save();

    // 🔔 Notify both users
    const senderSocket = global.onlineUsers.get(sender.id.toString());
    const receiverSocket = global.onlineUsers.get(receiver.id.toString());

    if (senderSocket) {
      global.io.to(senderSocket).emit("friends:added", {
        friendId: receiver.id,
        friend: {
          id: receiver.id,
          firstName: receiver.firstName,
          lastName: receiver.lastName,
          email: receiver.email,
        },
      });
    }

    if (receiverSocket) {
      global.io.to(receiverSocket).emit("friends:added", {
        friendId: sender.id,
        friend: {
          id: sender.id,
          firstName: sender.firstName,
          lastName: sender.lastName,
          email: sender.email,
        },
      });
    }

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.error("❌ Error accepting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Friends
 */
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "firstName lastName email avatar",
    );
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Remove Friend
 */
exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body; // better to use ID instead of name search

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove each other
    user.friends.pull(friend._id);
    friend.friends.pull(user._id);

    await user.save();
    await friend.save();

    // 🔔 Notify both users
    const userSocket = global.onlineUsers.get(userId.toString());
    const friendSocket = global.onlineUsers.get(friendId.toString());

    if (userSocket) {
      global.io.to(userSocket).emit("friends:removed", { friendId });
    }
    if (friendSocket) {
      global.io.to(friendSocket).emit("friends:removed", { friendId: userId });
    }

    res.status(200).json({ message: "Friend removed", friendId });
  } catch (err) {
    console.error("❌ Error removing friend:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Friend Tasks
 */
exports.getFriendTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.id;

    const user = await User.findById(userId);

    if (!user.friends.includes(friendId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const tasks = await Task.find({ user: friendId })
      .populate("user", "firstName lastName _id")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
