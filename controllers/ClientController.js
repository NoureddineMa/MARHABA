const jwt = require('jsonwebtoken');
const User = require('../models/authModel'); 
const Roles = require('../models/rolesModel');


const Client = (req,res) => {
    res.json({message: "Hello Client"})
}

module.exports = { Client }