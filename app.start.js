const App=require('./app');
const Mongoose = require('mongoose');


// connexion Mongoose serveur DB
Mongoose.promise=global.promise;

Mongoose.connect ('mongodb://@localhost:27017/technocite',(error)=>{
    if (error) throw error;
    console.log('Mongo is now connected to our sytem please request away,')
});

// connexion localhost

App.listen(8007,()=>{
console.log('server is running 8007');
});