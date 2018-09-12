const Passport=require('passport');

exports.login=Passport.authenticate('local',{
failureRedirect:'/login',
succesRedirect:'/',
});
 
exports.logout=(req,res)=>{
req.logout();
res.redirect('/');
};

exports.isAuthenticated=(req,res,next)=>{
if(req.isAuthenticated()){
    next()
}
res.redirect('/login');
}