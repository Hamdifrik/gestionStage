const Saveoffre = require('../models/saveoffre.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const saveoffre = new Saveoffre({
        firstname: req.body.firstname || "Untitled saveoffre", 
        lastname : req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        cv: req.body.cv,
        annonce: req.body.annonce,
        
       

        
    });

    // Save admin in the database
    saveoffre.save()
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
    Saveoffre.find()
    .then(saveoffres => {
        res.send(saveoffres);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving saveoffres."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Saveoffre.findById(req.params.saveoffreId)
    .then(saveoffre => {
        if(!saveoffre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });            
        }
        res.send(saveoffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.saveoffreId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.offreID) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Saveoffre.findByIdAndUpdate(req.params.saveoffreId, {
        firstname: req.body.firstname || "Untitled saveoffre", 
        lastname : req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        cv: req.body.cv,
        annonce: req.body.annonce,

      
        
    }, {new: true})
    .then(saveoffre => {
        if(!saveoffre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });
        }
        res.send(saveoffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.saveoffreId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Saveoffre.findByIdAndRemove(req.params.saveoffreId)
    .then(saveoffre => {
        if(!saveoffre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.saveoffreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.saveoffreId
        });
    });
};
