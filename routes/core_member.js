const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const {corecheck} = require('../middleware/checkuser')
const {postreq,getreq} = require('../controller/core_member')

router.route('/:id').post(postreq).get(getreq);

module.exports = router