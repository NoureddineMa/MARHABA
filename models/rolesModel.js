const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({

    role: {
        type: String
    }
    
})

module.exports = mongoose.model('Role', RolesSchema)