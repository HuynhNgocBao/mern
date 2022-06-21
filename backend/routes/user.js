const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.use(protect);
router.use('/', userController.getUser);

module.exports = router;