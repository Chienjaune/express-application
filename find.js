const Movie=require(`${process.cwd()}/models/movies`);
const Fs=require('fs');
const Util=require('util')
const Read=Util.promisify(Fs.readFile);
const Mongoose = require('mongoose');

Mongoose.promise=global.promise;

Mongoose.connect ('mongodb://@localhost:27017/technocite',(error)=>{
    if (error) throw error;
    console.log('Mongo is now connected to our system please request away,')
});

exports.index= async (req,res)=>{
                console.log('Dans le controleur');
    
    
        let top6= await Movie.find()
      .sort({'fields.rank':-1})
      .limit(9);

      console.log(top6)
    }

    