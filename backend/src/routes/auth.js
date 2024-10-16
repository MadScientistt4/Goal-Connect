const express = require('express');
const {createUser} = require('../controllers/signup.js');
const { loginUser } = require('../controllers/login.js');
const router = express.Router();

//Register a user
router.post('/signup', createUser);
//login
router.post('/login', loginUser);

module.exports = router