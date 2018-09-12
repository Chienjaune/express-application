const [major,minor]=process.versions.node.split('.').map(parseFloat)
if(major<7 || major===7 && minor<= 5){
    console.log('---The node version of the server is too low for modern programmation');
    throw ('The node version of the server is too low for modern node programmation')
}



const App=require('./app');
const Mongoose = require('mongoose');
const DotEnv=require('dotenv');


// connexion Mongoose serveur DB
DotEnv.config({path:'./variables.env'});

Mongoose.promise=global.promise;

Mongoose.connect ('mongodb://@localhost:27017/technocite',(error)=>{
    if (error) throw error;
    console.log('Mongo is now connected to our system please request away,')
});

// connexion localhost

App.listen(process.env.PORT,()=>{
console.log('server is running '+ process.env.PORT);
});