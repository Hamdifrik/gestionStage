const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    nom: {
            type: String,
            unique: [true, 'The login is unique']
           
    },

    prenom: {
        type: String,
        unique: [true, 'The login is unique']
       
},
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    
    password: String,

  
    
    cv:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);