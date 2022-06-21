const asyncHandler = require('express-async-handler');
const User = require('../models/user')

class userController{
    getUser = asyncHandler(async(req,res)=>{
        const user = await User.findById(req.auth).select('username email');
        res.status(200).json(user);
    })
}

module.exports = new userController();