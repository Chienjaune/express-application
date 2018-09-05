const i18n=require('i18n');
const Movie=require(`${process.cwd()}/models/movies`);



 exports.index= async (req,res)=>{
        //console.log('Dans le controleur');


let top6= await Movie.find()
.sort({'fields.rank':-1})
.limit(9);

console.log(top6)
 //console.log(i18n.__('hello'));
 res.render('pages/index',{

});

}

   