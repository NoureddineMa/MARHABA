const jwt = require('jsonwebtoken');
const bcyrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/authModel'); 
const Roles = require('../models/rolesModel')
const nodemailer = require('nodemailer');
const { findOne } = require('../models/rolesModel');

// *** *** *** method :post *** *** ***
// @Route :api/auth/login
// *** acces : public ***
const Login = asyncHandler(async (req,res) => {
     const {email,password} = req.body
     // check for user email :
     const user = await User.findOne({email})
     console.log(user.isValidate);
     const StatutUser = user.isValidate
     if(user){ 
        if(StatutUser == true ){
     userRole = user.role
     const findRoleByName = await Roles.findById({_id:userRole})
     const  nameRole = findRoleByName.role
     if(user && (await bcyrypt.compare(password, user.password))){
        // create token: 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '24h' // expires in 24 hours
        });
        res.cookie('token', token, { expire: new Date() + 8062000 })
        res.send(`Hello ${user.name} u are ${nameRole}`)  
     } else {
        res.status(400)
        throw new Error('Invalid credentials')
     }
    }
    else {
        res.json({message: 'U need to verify your email to login !! '});
    }
}
});
// *** *** *** method :post *** *** ***
// @Route :api/auth/Register
// *** acces : public ***
const Register =  asyncHandler(async (req,res) => {
    const {name,email,password,phone,adresse,role } = req.body
   
    if(!name  || !email || !password || !phone || !adresse || !role  ) {
        res.status(400)
        res.json({message : "Please add all fields"})
    }
    // check UserifExists:
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        res.json({message : "user already exist"})
    }
    // hadsh Password : "Bcryptjs"
    const salt = await bcyrypt.genSalt(10)
    const hashedPassword = await bcyrypt.hash(password, salt)
    // find roles by id:
    const roleid = await Roles.findOne({role:req.body.role})
    const nameRole = roleid._id
    // create a user : 
    const user = await User.create ({
        name,
        email,
        password: hashedPassword,
        phone,
        adresse,
        role:nameRole
    })
    if(user){
        res.status(201).json({
            message: "created succesufly but first you need to verify your email"
        })
            // create MailTransporter:
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP,
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PWD_EMAIL
        }, 
        tls: {
            rejectUnauthorized: false
        } 
    })
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' }) 
    // create MailBody
    const mailContent = {
        from: "Verify Your Email" + process.env.EMAIL,
        to: email,
        subject: 'Verify Your Email ',
        html: `<h2>Hi Please Verify Your Email <a href="http://localhost:3000/api/auth/register/verify/${token}">here</a></h2>`   
    }
    // send mail:
    transporter.sendMail(mailContent, (err) => !err ? console.log('mail just sent to '+user.email) : console.log(err))
    }
    // other Scénarion when the user cant register 
    else
    {
        res.status(400)
        res.json({message: "Invalid User Data"})
    }
})
// *** *** *** method :post *** *** ***
// @Route :api/auth/getUser
// *** acces : private ***
const Getme = asyncHandler(async (req,res) => {
    const{_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})
// *** *** *** method :post *** *** ***
// @Route :api/auth/ForgetPassword
// *** acces : public ***
const ForgetPassword =   asyncHandler(async (req,res) => {
            const Useremail = req.body.email
            console.log(Useremail);
            const retrieveEmail = await User.findOne({email: Useremail})
            if(retrieveEmail){
            const transporter = nodemailer.createTransport({
                service: process.env.SMTP,
                auth: {
                    user: process.env.EMAIL, 
                    pass: process.env.PWD_EMAIL
                }, 
                tls: {
                    rejectUnauthorized: false
                } 
            })
            const token = jwt.sign({_id: retrieveEmail._id}, process.env.JWT_SECRET, { expiresIn: '2h' }) 
            // create MailBody
            const mailContent = {
                from: "Reset Password " + process.env.EMAIL,
                to: Useremail,
                subject: 'Verify Your Email ',
                html: `<h2>To reset you password please click here <a href="http://localhost:3000/api/auth/resetpassword/${token}">here</a></h2>`
            }
            // send mail:
            transporter.sendMail(mailContent, (err) => !err ? console.log('mail just sent to '+Useremail) : console.log(err))
            res.json({message: `email verification sent to ${Useremail}`})
        } else {
            res.json({message: "Email not found or incorrect"})
        }
        })
        
// *** *** *** method :post *** *** ***
// @Route :api/auth/ResetPassword
// *** acces : public ***
const ResetPassword =  (req,res) => {

}

// *** *** *** method :post *** *** ***
// @Route :/register/verify/:token
// *** acces : private ***
const emailVerification = (req,res) => {
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
            res.json({message:"something went wrong " + err})
        })
    }


module.exports = { Login, Register, ForgetPassword, ResetPassword , Getme , emailVerification}