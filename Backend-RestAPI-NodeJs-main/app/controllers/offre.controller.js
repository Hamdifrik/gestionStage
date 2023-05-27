const Offre = require('../models/offre.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const offre = new Offre({
        titre: req.body.titre || "Untitled offre", 
        description : req.body.description,
        dateD : req.body.dateD,
        dateF: req.body.dateF,
        email: req.body.email,
        tel: req.body.tel,

        
    });

    // Save admin in the database
    offre.save()
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
    Offre.find()
    .then(offres => {
        res.send(offres);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving offres."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Offre.findById(req.params.offreId)
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });            
        }
        res.send(offre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.offreId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Offre.findByIdAndUpdate(req.params.offreId, {
        titre: req.body.titre || "Untitled offre", 
        description : req.body.titre,
        dateD : req.body.dateD,
        dateF: req.body.dateF,
        email: req.body.email,
        tel: req.body.tel,
        
    }, {new: true})
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });
        }
        res.send(offre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.offreId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Offre.findByIdAndRemove(req.params.offreId)
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.offreId
        });
    });
};
