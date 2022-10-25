const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


const  Livreur   = require('../middlewares/MiddlewareLivreur')

router.post('/livreur/me' ,Livreur);

module.exports = router;
