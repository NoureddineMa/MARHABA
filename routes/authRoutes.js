const express = require('express')
const router = express.Router()
const User = require('../models/authModel')
const verify = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')

const { Login , Register , ForgetPassword , ResetPassword , emailVerification  } = require('../controllers/authcontroller')


router.post('/login',Login)
router.post('/register',Register)
router.post('/forgetpassword',ForgetPassword)

// => :token to reset password (just for test Route)
router.post('/resetpassword/:token',ResetPassword)



router.get('/getme', verify , async (req,res) => {
    const id = req.user._id
    const user = await User.findById({_id: id})
    res.send(`Hello ${user.name} u have acces to this link`)
})

// verify Email:
router.get('/register/verify/:token' , emailVerification)




module.exports = { router }