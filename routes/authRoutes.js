const express = require('express')
const router = express.Router()

const { Login , Register , ForgetPassword , ResetPassword , Getme } = require('../controllers/authcontroller')

const {protect} = require('../middlewares/authMiddelware')

router.post('/login',Login)
router.post('/register',Register)
router.post('/forgetpassword',ForgetPassword)
// => :token to reset password (just for test Route)
router.post('/resetpassword',ResetPassword) 
router.post('/getme', protect,Getme)


module.exports = { router }