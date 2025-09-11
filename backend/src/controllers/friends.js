const User = require("../models/userSchema.js");
const Task = require("../models/taskSchema.js");

exports.addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email } = req.body;

    let friend;
    // Build dynamic OR conditions
    if (email) {
      // Email is unique, check that first
      friend = await User.findOne({
        email: { $regex: `^${email.trim()}$`, $options: "i" },
      });
    } else if (firstName && lastName) {
      // If no email, fallback to name combo
      friend = await User.findOne({
        firstName: { $regex: `^${firstName.trim()}$`, $options: "i" },
        lastName: { $regex: `^${lastName.trim()}$`, $options: "i" },
      });
    } else if (firstName) {
      // Just first name as last resort
      friend = await User.findOne({
        firstName: { $regex: `^${firstName.trim()}$`, $options: "i" },
      });
    }

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (friend.id.toString() === userId) {
      return res.status(400).json({ message: "You can't add yourself" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    if (user.friends.includes(friend.email)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Make them friends
    user.friends.push(friend.id);
    friend.friends.push(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added", friend });
  } catch (err) {
    console.error("❌ Error in addFriend:", err);
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

exports.removeFirend = async (req, res) => {
  try {
    const userId = req.user.id;

    // Case-insensitive search by firstName
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
      console.log("Friend not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    user.friends.pop(friend.id);
    friend.friends.pop(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend Removed", friend });
  } catch (err) {
    console.error(err);
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
