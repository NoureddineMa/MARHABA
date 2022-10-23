const jwt = require('jsonwebtoken');
const User = require('../models/authModel');
const role = require('../models/rolesModel');



module.exports = async  (req,res,next) =>  {
    token = req.header('auth-token')

    const userInfos = jwt.verify(token, process.env.JWT_SECRET)
    const userId = userInfos._id
    // after retrive id we need to check role if is client : 
    const user = await User.findById({_id: userId})
    const idRole = user.role
    // after get the user we need to get name of role:
    const UserRole = await role.findById({_id:idRole})
    const roleName = UserRole.role
    if(roleName == "livreur"){
        res.json({message: `Hello ${user.name} ur role is ${roleName}`})
        } else {
        res.json({message: "Acces Denied"})
        }}