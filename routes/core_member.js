const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const {corecheck} = require('../controller/alumni')

router.route("/").get(verifyToken,corecheck).post(verifyToken);

module.exports = router