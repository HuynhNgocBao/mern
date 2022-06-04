const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {protect} = require('../middlewares/authMiddleware');

router.post("/login", userController.login);
router.get("/me", protect, userController.getMe);
router.post("/", userController.register);

module.exports = router;
