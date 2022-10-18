const express = require('express')
const router = express.Router()
const User = require('../models/authModel')
const verify = require('../middlewares/verifyToken')
const jwt = require('jsonwebtoken')

const { Login , Register , ForgetPassword , ResetPassword  } = require('../controllers/authcontroller')


router.post('/login',Login)
router.post('/register',Register)
router.post('/forgetpassword',ForgetPassword)
// => :token to reset password (just for test Route)
router.post('/resetpassword',ResetPassword) 
router.get('/getme', verify , async (req,res) => {
    const id = req.user._id
    const user = await User.findById({_id: id})
    res.send(`Hello ${user.name} u have acces to this link`)
})

router.get('/register/verify/:token' , (req,res) => {
    // retrieve token from params
    const token = req.params.token
    // verify token:
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    // get id
    const userId = userData._id
    User.updateOne({_id: userId}, { $set: { isValidate: true } })
        .then(() => {
            res.send('email verified succefully') && console.log('email verified succefully')
        }).catch((err)=> {
        res.json({message:"something went wrong"})
    })
})


module.exports = { router }