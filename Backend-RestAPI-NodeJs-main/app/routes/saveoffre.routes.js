module.exports = (app) => {
    const saveoffres = require('../controllers/saveoffre.controller.js');


    app.post('/saveoffres', saveoffres.create);

    
    app.get('/saveoffres', saveoffres.findAll);

   
    app.get('/saveoffres/:saveoffreId', saveoffres.findOne);

    
    app.put('/saveoffres/:saveoffreId', saveoffres.update);

    
    app.delete('/saveoffres/:saveoffreId', saveoffres.delete);
}
