const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');
const {alumicheck} = require('../middleware/checkuser');
const {getreq} = require('../controller/cards');

router.route("/:id").get(getreq);

module.exports = router