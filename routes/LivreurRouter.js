const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


const  Livreur   = require('../middlewares/MiddlewareLivreur')

router.get('/livreur/me/', verifyToken ,Livreur);

module.exports = router
