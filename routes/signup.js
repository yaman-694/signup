const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
// const auth = require('./middleware/auth')
const userSchema = require("../model/User");
const {
    getRegister,
    postRegister
} = require('../controller/signup');


router.route("/").get(getRegister).post(postRegister);

module.exports = router