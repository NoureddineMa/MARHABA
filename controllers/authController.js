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
    
     if(user && (await bcyrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            adresse: user.adresse,
            token: generateToken(user._id)
        })
     } else {
        res.status(400)
        throw new Error('Invalid credentials')
     }
})


// *** *** *** method :post *** *** ***
// @Route :api/auth/Register
// *** acces : public ***
const Register =  asyncHandler(async (req,res) => {
    const {name,email,password,phone,adresse,role } = req.body
    console.log(role);
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
    

    // obj = roleid.ObjectId;
    console.log(nameRole);

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
            _id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
            phone: user.phone,
            adresse: user.adresse,
            role: nameRole,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
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



// generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    })
}


module.exports = { Login, Register, ForgetPassword, ResetPassword , Getme }