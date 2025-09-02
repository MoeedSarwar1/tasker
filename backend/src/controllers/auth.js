const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Name or Email already taken" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    res.json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, please try again later.", error });
  }
};

module.exports = { signup };
