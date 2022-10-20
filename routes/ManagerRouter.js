const express = require('express')
const router = express.Router()
const User = require('../models/authModel')
const verify = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')


const  Manager  = require('../middlewares/MiddlewareManager');


router.post('/manager', Manager)

module.exports = router