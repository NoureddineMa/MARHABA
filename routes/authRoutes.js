const express = require('express')
const router = express.Router()

const { Login , Register , ForgetPassword , ResetPassword } = require('../controllers/authcontroller')

router.post('/login',Login)
router.post('/register',Register)
router.post('/forgetpassword',ForgetPassword)
// => :token to reset password (just for test Route)
router.post('/resetpassword',ResetPassword) 


module.exports = { router }