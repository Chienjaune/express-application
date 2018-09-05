const Express=require('express'),
    i18n = require("i18n");
    CookieParser=require('cookie-parser'),
    Router=require('./app.router');
   // ErrorHandler=require('./helpers/error-handler');

    const app=Express();
/* configuration de i18n module*/

    i18n.configure({
    locales:['en', 'fr'],
    cookie:'movies-app-locales',
    directory: __dirname + '/locales'
});

/*expose cookies on req.cookies*/

app.use(CookieParser());

/*set i18n middleware on app*/
app.use(i18n.init);

/*set router on*/
app.use('/',Router);

/*remplace le app.listen*/
module.exports=app;