const jwt = require('jsonwebtoken');
const User = require('../models/authModel'); 
const Roles = require('../models/rolesModel');


const Livreur = (req,res) => {
    res.json({message: "Hello Livreur"})
}



module.exports = { Livreur }