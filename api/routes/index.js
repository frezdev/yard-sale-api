const { Router } = require('express');
const { categoriesRouter } = require('./categories.router');
const { productsRouter } = require('./products.router');
const { usersRouter } = require('./users.router');

function routerApi (app) {
  const router = Router();

  app.use('/api/v1/', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;

