const i18n=require('i18n');

exports.index=(req,res)=>{
    console.log(i18n.__('hello'));
    res.render('pages/index',{

    });
};