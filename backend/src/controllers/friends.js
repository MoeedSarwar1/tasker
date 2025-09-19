const User = require("../models/userSchema.js");
const Task = require("../models/taskSchema.js");
const FriendRequest = require("../models/friendRequests.js");
const { getIo, onlineUsers } = require("./socket.js");

exports.sendFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;

    const friend = await User.findOne({ email: email.trim() });
    if (!friend) return res.status(404).json({ message: "User not found" });

    if (friend.id.toString() === userId) {
      return res.status(400).json({ message: "You can't add yourself" });
    }

    // Check if already friends
    const user = await User.findById(userId);
    if (user.friends.includes(friend.id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Check if request already exists
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

    // 🔔 Notify receiver in real-time
    const receiverSocket = onlineUsers.get(friend.id.toString());
    if (receiverSocket) {
      getIo()
        .to(receiverSocket)
        .emit("friends:request:received", {
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
exports.getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you use auth middleware

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "firstName lastName email") // get sender details
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
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

    // 🔔 Notify sender in real-time
    const senderSocket = onlineUsers.get(request.sender.toString());
    if (senderSocket) {
      getIo().to(senderSocket).emit("friends:request:rejected", {
        requestId: request._id,
      });
    }

    res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    console.error("❌ Error rejecting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update request status
    request.status = "accepted";
    await request.save();

    // Add each other as friends
    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.receiver);

    sender.friends.push(receiver.id);
    receiver.friends.push(sender.id);

    await sender.save();
    await receiver.save();

    const senderSocket = onlineUsers.get(sender.id.toString());
    const receiverSocket = onlineUsers.get(receiver.id.toString());

    if (senderSocket) {
      getIo()
        .to(senderSocket)
        .emit("friends:added", {
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
      getIo()
        .to(receiverSocket)
        .emit("friends:added", {
          friendId: sender.id,
          friend: {
            id: sender.id,
            firstName: sender.firstName,
            lastName: sender.lastName,
            email: sender.email,
          },
        });
    }

    res.status(200).json({
      message: "Friend request accepted",
      friend: {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        email: friend.email,
      },
    });
  } catch (err) {
    console.error("❌ Error accepting friend request:", err);
    res.status(500).json({ message: "Server error" });
  }
};
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

exports.removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;
    let friend;

    if (lastName) {
      friend = await User.findOne({
        firstName: { $regex: `^${firstName.trim()}$`, $options: "i" },
        lastName: { $regex: `^${lastName.trim()}$`, $options: "i" },
      });
    } else {
      friend = await User.findOne({
        firstName: { $regex: `^${firstName.trim()}$`, $options: "i" },
      });
    }

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    user.friends = user.friends.filter((f) => f.toString() !== friend.id);
    friend.friends = friend.friends.filter((f) => f.toString() !== userId);

    await user.save();
    await friend.save();

    // 🔔 Notify both users in real-time
    const userSocket = onlineUsers.get(userId.toString());
    const friendSocket = onlineUsers.get(friend.id.toString());

    if (userSocket) {
      getIo().to(userSocket).emit("friends:removed", { friendId: friend.id });
    }
    if (friendSocket) {
      getIo().to(friendSocket).emit("friends:removed", { friendId: user.id });
    }

    res.status(200).json({ message: "Friend Removed", friend });
  } catch (err) {
    console.error("❌ Error removing friend:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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
