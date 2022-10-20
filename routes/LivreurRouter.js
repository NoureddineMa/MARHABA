const express = require('express')
const router = express.Router()
const User = require('../models/authModel')
const verify = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')

const  Livreur   = require('../middlewares/MiddlewareLivreur')

router.post('/livreur' , Livreur);

module.exports = router
