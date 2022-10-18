const jwt = require('jsonwebtoken');
const bcyrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/authModel'); 
const Roles = require('../models/rolesModel')




// *** *** *** method :post *** *** ***
// @Route :api/auth/login
// *** acces : public ***
const Login = asyncHandler(async (req,res) => {
     const {email,password} = req.body
     // check for user email :
     const user = await User.findOne({email})
     if(user){
     userRole = user.role
    //  console.log(user.role);
    
     const findRoleByName = await Roles.findById({_id:userRole})
     const  nameRole = findRoleByName.role
    //  console.log(nameRole);
     
     if(user && (await bcyrypt.compare(password, user.password))){
        // create token: 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.header('auth-token', token).send(`Hello ${user.name} u are ${nameRole}`)
        // log token : 
        console.log(token);

     } else {
        res.status(400)
        throw new Error('Invalid credentials')
     }
    }
})


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
            message: "created succesufly"
        })
    }else{
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






module.exports = { Login, Register, ForgetPassword, ResetPassword , Getme }