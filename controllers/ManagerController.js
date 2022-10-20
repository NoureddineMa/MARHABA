const jwt = require('jsonwebtoken');
const User = require('../models/authModel'); 
const Roles = require('../models/rolesModel');

const Manager = (req,res) => {
    res.json({message: "Hello Manager"})
}

module.exports = { Manager }

