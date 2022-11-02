const express = require('express')
const router = express.Router()
const Client = require('../middlewares/MiddlewareClient')
const verifyToken = require('../middlewares/verifyToken')

router.get('/client/me/' , verifyToken,Client);

module.exports =  router