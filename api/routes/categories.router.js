const { Router } = require('express');
const productsRouter = require('../routes/products.router');
const CategoriesSevice = require('../services/categories.service');

const { products } = productsRouter.services;

const categoriesRouter = Router();

const services = new CategoriesSevice(products);

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await services.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400);
  }
});

module.exports = { categoriesRouter };
