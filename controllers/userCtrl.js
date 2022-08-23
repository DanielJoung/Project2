const express = require('express');
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require('../models/users.js')



module.exports = router