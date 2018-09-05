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
     title:'Movie words',
     top6_slide:top6.slice(0,3),
     top6_right:top6.slice(3,5),
     top6_left:top6.slice(5,9),


});
};
exports.details=async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let movie= await Movie.findOne({_id:id});
    console.log(movie);
    res.render('pages/details',{
        title:movie.fields.title,
        movie:movie
    });
};

exports.reviews=async(req,res)=>{
    let movies= await Movie.find()
    .sort({'fields.title':1})
    .limit(12);
    res.render('pages/reviews',{
        title:'movie reviews',
        movie:movies
    })
}



   