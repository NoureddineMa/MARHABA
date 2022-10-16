const jwt = require('jsonwebtoken');
const bcyrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/authModel') 



// *** *** *** method :post *** *** ***
// @Route :api/auth/login
// *** acces : public ***
const Login = asyncHandler(async (req,res) => {
    try {
        res.status(200).send(req.body)
    } catch (error) {
        res.send(error)
    }
})


// *** *** *** method :post *** *** ***
// @Route :api/auth/Register
// *** acces : public ***
const Register =  asyncHandler(async (req,res) => {
    const {name,email,password,phone,adresse } = req.body

    if(!name || !email || !password || !phone || !adresse ) {
        res.status(400)
        throw new Error ('Please add all fields')
    }
    res.json({message : 'register'}) 
})


// *** *** *** method :post *** *** ***
// @Route :api/auth/ForgetPassword
// *** acces : public ***
const ForgetPassword =  (req,res) => {
    try {
        res.status(200).send('this a Forget Password function')
    } catch (error) {
        res.send(error)
    }   
}


// *** *** *** method :post *** *** ***
// @Route :api/auth/ResetPassword
// *** acces : public ***
const ResetPassword =  (req,res) => {
    try {
        res.status(200).send('this a reset Password function of')
    } catch (error) {
        res.send(error)
    }
    // token = req.params.id
}


module.exports = { Login, Register, ForgetPassword, ResetPassword }