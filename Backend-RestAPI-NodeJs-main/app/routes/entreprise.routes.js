module.exports = (app) => {
    const entreprises = require('../controllers/entreprise.controller.js');


    app.post('/entreprises', entreprises.create);

    
    app.get('/entreprises', entreprises.findAll);

   
    app.get('/entreprises/:entrepriseId', entreprises.findOne);

    
    app.put('/entreprises/:entrepriseId', entreprises.update);

    
    app.delete('/entreprises/:entrepriseId', entreprises.delete);
}
