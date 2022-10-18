const mongoose = require('mongoose');
const Role = require('./rolesModel');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please add a name']
    },
    email: {
        type:String,
        required: [true, 'please add a email'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'please add a password']
    },
    phone: {
        type:Number,
        required : [true, 'please add a phone number']
    },
    adresse: {
        type:String,
        required: [true, 'please add a Adresse']
    },
    role: [{
        type: String,
        ref: 'Role',
       }],
    isValidate: {
        type: Boolean,
        default: false
    }   
})

module.exports = mongoose.model('User', userSchema)