const mongoose = require('mongoose');

const SaveoffreSchema = mongoose.Schema({
firstname: {
        type: String,
        unique: [true, 'The login is unique']
       
},

lastname: {
    type: String,
    unique: [true, 'The login is unique']
   
},
email: {
        type: String,
        unique: [true, 'The email is unique']
       
},

password: String,
phone: String,
cv: String,
annonce: String,



}, {
    timestamps: true
});

module.exports = mongoose.model('Saveoffre', SaveoffreSchema);