const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");
const User = require("../models/user");
class goalController {
  getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find({userId: req.user.id});
    res.status(200).json(goals);
  });

  setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(500);
      throw new Error("error");
    }
    const goal = await Goal.create({
      text: req.body.text,
      userId: req.user.id,
    });
    res.status(200).json(goal);
  });

  updateGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user){
      res.status(401);
      throw new Error('User not found');
    }
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.json(400);
      throw new Error("Goal not found");
    }
    if (goal.userId.toString()!==user.id){
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedGoal);
  });

  deleteGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user){
      res.status(401);
      throw new Error('User not found');
    }
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.json(400);
      throw new Error("Goal not found");
    }
    if (goal.userId.toString()!==user.id){
      res.status(401);
      throw new Error("User not authorized");
    }
    await goal.remove();
    res.status(200).json({ message: `Delete goal of id: ${req.params.id}` });
  });
}

module.exports = new goalController();
