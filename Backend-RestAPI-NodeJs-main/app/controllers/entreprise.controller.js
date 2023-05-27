const Entreprise = require('../models/entreprise.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const entreprise = new Entreprise({
        nom: req.body.nom || "Untitled entreprise", 
        prenom : req.body.prenom,
        email : req.body.email,
        password: req.body.password,
       

        
    });

    // Save admin in the database
    entreprise.save()
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
    Entreprise.find()
    .then(entreprises => {
        res.send(entreprises);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entreprises."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Entreprise.findById(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });            
        }
        res.send(entreprise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.entrepriseId
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
    Entreprise.findByIdAndUpdate(req.params.entrepriseId, {
        nom: req.body.nom || "Untitled entreprise", 
        prenom : req.body.nom,
        email : req.body.email,
        password: req.body.password,
       
        
    }, {new: true})
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });
        }
        res.send(entreprise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.entrepriseId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Entreprise.findByIdAndRemove(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.entrepriseId
        });
    });
};
