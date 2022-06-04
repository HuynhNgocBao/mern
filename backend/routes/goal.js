const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const {protect} = require('../middlewares/authMiddleware');

router.get("/",protect, goalController.getGoal);

router.post("/",protect, goalController.setGoal);

router.put("/:id",protect, goalController.updateGoal);

router.delete("/:id",protect, goalController.deleteGoal);

module.exports = router;
