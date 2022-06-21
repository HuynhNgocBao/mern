const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

class authController {
  register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      
    });
    if (user) {
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user name");
    }
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check email exists
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie('token',generateToken(user._id)).send();
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  });

  getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  });
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
  });
};
module.exports = new authController();
