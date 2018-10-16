'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.wordFilter);
  router.get('/test', controller.home.replaceTabooWord);
};
