const express = require('express')
const router = express.Router()
const User = require('../models/authModel')
// const verify = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')
const Client = require('../middlewares/MiddlewareClient')

router.post('/client' , Client);

module.exports =  router;