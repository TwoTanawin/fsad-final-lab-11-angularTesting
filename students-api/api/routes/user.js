const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// Register endpoint
router.post('/register', userService.registerUser);
router.post('/login', userService.loginUser)
module.exports = router;
