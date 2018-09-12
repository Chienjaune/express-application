const Express = require('express'),
      Router = Express.Router(),
      PageController = require(`${process.cwd()}/controllers/page`);
AuthenticationController = require(`${process.cwd()}/controllers/authentication`);

Router
      .route('/')
      .get(PageController.index);

Router
      .route('/about')
      .get(AuthenticationController.isAuthenticated,
           PageController.about)

Router
      .route('/review/:id')
      .get(PageController.details);

Router
      .route('/reviews')
      .get(PageController.reviews);

Router
      .route('/reviews/:genre/:year/:page')
      .get(PageController.filter);

Router
      .route('/login')
      .get(PageController.login);

Router
      .route('/register')
      .get(PageController.subscribe)
      .post(PageController.validateSubscription,
            AuthenticationController.login);
Router
      .route('/logout')
      .get(AuthenticationController.logout);


module.exports = Router;

