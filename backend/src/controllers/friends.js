const User = require("../models/userSchema.js");

exports.addFriend = async (req, res) => {
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

    if (friend.id.toString() === userId)
      return res.status(400).json({ message: "You can't add yourself" });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Requesting user not found" });
    }

    // Already friends?
    if (user.friends.includes(friend.id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    user.friends.push(friend.id);
    friend.friends.push(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added", friend });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "firstName lastName email",
    );
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
