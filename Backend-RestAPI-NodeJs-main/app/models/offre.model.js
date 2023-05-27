const mongoose = require('mongoose');

const OffreSchema = mongoose.Schema({
    titre: {
            type: String,
            unique: [true, 'The login is unique']
           
    },

    description: {
        type: String,
        unique: [true, 'The login is unique']
       
},
    dateD: {
            type: String,
            unique: [true, 'The dateD is unique']
           
    },
     dateF: {
            type: String,
            unique: [true, 'The dateD is unique']
           
    },
    email: String,

    tel: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Offre', OffreSchema);