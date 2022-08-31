const express = require('express');
const md5 = require('md5')
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const {alumicheck} = require('../controller/alumni')

router.route("/").get(verifyToken,alumicheck);

module.exports = router