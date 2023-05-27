const User = require('../models/user.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const user = new User({
        nom: req.body.nom || "Untitled user", 
        prenom : req.body.prenom,
        email : req.body.email,
        password: req.body.password,
       
        cv: req.body.cv,

        
    });

    // Save admin in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.userId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        nom: req.body.nom || "Untitled user", 
        prenom : req.body.nom,
        email : req.body.email,
        password: req.body.password,
 
        cv: req.body.cv,
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.userId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.userId
        });
    });
};
