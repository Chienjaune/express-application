const Express=require('express'),
      Router=Express.Router(),
      PageController=require(`${__dirname}/controllers/page`);

Router
.route('/')
.get(PageController.index);

module.exports=Router;

//${process.cwd}