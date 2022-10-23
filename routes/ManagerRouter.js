const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')



const  Manager  = require('../middlewares/MiddlewareManager');


router.post('/manager/me',verifyToken,Manager)

module.exports = router
