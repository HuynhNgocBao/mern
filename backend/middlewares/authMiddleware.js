const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token
  ) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.auth = decoded.id;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Invalid authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Invalid authorized, no token");
  }
});

module.exports = { protect };
