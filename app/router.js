'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.wordFilter);
  router.get('/test', controller.home.replaceTabooWord);
  router.post('/account/server/api/login', controller.login.Login);
  router.get('/account/server/api/logout', controller.login.Logout);
  router.get('/account/server/api/captcha', controller.login.CreateCaptcha);
};


