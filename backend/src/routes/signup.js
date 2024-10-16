const express = require('express')
const { createUser } = require('../controllers/signup.js')

const router = express.Router()

//Register a user
router.post('/signup', createUser)

module.exports = router