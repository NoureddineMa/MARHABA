const express = require('express')
const router = express.Router()
const Client = require('../middlewares/MiddlewareClient')
const verifyToken = require('../middlewares/verifyToken')

router.post('/client/me' , verifyToken,Client);

module.exports =  router;