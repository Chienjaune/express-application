const i18n = require('i18n');
const Movie = require(`${process.cwd()}/models/movies`);
const User=require(`${process.cwd()}/models/user`);
const Passport=require('passport');



exports.index = async (req, res) => {
    //console.log('Dans le controleur');


    let top6 = await Movie.find()
        .sort({ 'fields.rank': -1 })
        .limit(9);

    //console.log(top6)
    //console.log(i18n.__('hello'));
    res.render('pages/index', {
        title: 'Movie words',
        top6_slide: top6.slice(0, 3),
        top6_right: top6.slice(3, 5),
        top6_left: top6.slice(5, 9),
        isAuthenticated:req.isAuthenticated(),


    });
};

exports.about=(req,res)=>{
    res.render('page/about',{
        title:'about',
        h1:'about',
        isAuthenticated:req.isAuthenticated(),
    });
};

exports.validateSubscription=(req,res,next)=>{
//-----------Subscription Validation

req.sanitizeBody('username');

req.checkBody('username','vous devez entrer un nom').notEmpty();
req.checkBody('email','vous devez indiquer un email valide').isEmail();
req.checkBody('password','vous devez entrer un mot de passe').notEmpty();
req.checkBody('password-confirm','vous devez confirmer le mot de pase').notEmpty();
req.checkBody('passwoed-confirm','les deux mots de passes doivent correspondre').equals(req.body.password);

const errors=req.validationErrors();
if(errors){
    res.render('page/subscribe',{
        title:'register',
        h1:'register',
        hasFooter:true,
        action:'/register',
        errors:errors,
        user:req.body
    });
}else{
    next();
}
};

exports.details = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let movie = await Movie.findOne({ _id: id });
    //console.log(movie);
    res.render('pages/details', {
        title: movie.fields.title,
        movie: movie,
        isAuthenticated:req.isAuthenticated(),
    });
};

exports.reviews = async (req, res) => {
    let movies = await Movie.find().sort({ 'fields.title': 1 });
    let genres = [];
    let years = [];
    let i = 2000, current = parseInt(new Date().getUTCFullYear());

    await movies.forEach(async (movie) => {
        await movie.fields.genres.forEach(async (genre) => {
            if (genres.lastIndexOf(genre) === -1) {
                await genres.push(genre.trim());
            }
        });
    });

    for (i; i <= current; i++) {
        years.push(i);
    }
    res.render('pages/reviews', {
        title: 'movie reviews',
        movie: movies.slice(0, 12),
        genres: genres.sort(),
        years: years.reverse(),
        isAuthenticated:req.isAuthenticated(),
    })
};
//4.action de controller ui gère la requête HTTP en ajax
exports.filter = async (req, res) => {
    console.log('wouf');
    let genre = req.params.genre;
    let year = req.params.year;
    let page = req.params.page - 1;
    let numberOfResultsToDisplay = 12;

    let movies = await Movie
        .find(
            {
                $and: [
                    { 'fields.genres': { $in: [genre] } },
                    { 'fields.year': year }
                ]
            }
        )
        .sort({ 'fields.title': 1 })
        .skip(numberOfResultsToDisplay * page)  //12*3=36 donne le numéro deu premier enregistrement de la page
        .limit(numberOfResultsToDisplay);

    //Retourner les résultat
    //Méthode1 : retourner la vue compilée côté serveur dan le cas ou il n'y a pas de framework côté client
    /* res.render('partials/movies', {
         movies: movies,
         layout: null
     });*/
    res.json(movies); //Express expose json() sur req, sinon, res.end(JSON.stringify(movies));

};

exports.subscribe= (req, res) => {
    if (typeof (req.session.passport) !== 'undefined') {
        res.redirect('/');
    }
    else {
        res.render('pages/subscribe', {
            action: '/Register',
            title: 'Register',
            h1: 'Register',
            hasFooter: true,
        });
    }
};
exports.register=(req,res)=>{
User.register(new User({
    username:req.body.username,
     email:req.body.email}),
    req.body.password,
    function(err,user){
        if(err){
           return res.render('pages/subscribe',
           {
               user:user,
                title:'Register',
                h1:'Register',
                action:'/register',
                errors:err,
            })
            
        }
        console.log('sortie');
        Passport.authenticate('local')(req,res,function(){
            res.redirect('/');
        })
    })
};

exports.login = (req, res) => {
    res.render('pages/login', {
        title: 'Login',
        h1: 'login',
        action: '/login',
    })
};