const express = require('express');
const router = express.Router();
const userSchema = require("../model/User");
const {
    getRegister,
    postRegister
} = require('../controller/signup');


router.route("/").get(getRegister).post(postRegister);

module.exports = router