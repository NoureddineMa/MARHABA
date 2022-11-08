const jwt = require('jsonwebtoken');
const User = require('../models/authModel');
const role = require('../models/rolesModel');

module.exports = async  (req,res,next) =>  {
    token = req.header('Authorization').split(' ')[1]

    if(token){
    const userInfos = jwt.verify(token, process.env.JWT_SECRET)
    const userId = userInfos._id
    // after retrive id we need to check role if is client : 
    const user = await User.findById({_id: userId})
    const idRole = user.role
    const nameUser = user.name
    // after get the user we need to get name of role:
    const UserRole = await role.findById({_id:idRole})
    const roleName = UserRole.role
    if(roleName == "client"){
        res.json({message:`hello ${nameUser} welcome to your space ${roleName}` ,user , roleName}).status(200)
    } else {
        res.status(400).json({message: "ACCES DENIED !!"})
}
}}
