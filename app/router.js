'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.homeController.index);

  require('./router/demoRouter')(app);
  
  require('./router/apiRouter')(app);

};

