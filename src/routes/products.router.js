const { Router } = require('express');
const ProductsService = require('../services/products.service');

const productsRouter = Router();

const services = new ProductsService();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await services.find();
    res.status(200).json({
      length: products.length,
      products
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error
    });
  }
});

productsRouter.get('/filter', async (req, res) => {
  res.send('this is a filter');
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.findOne(id);
    if (product) return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await services.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updated = await services.update(id, body);
    res.status(201).json({
      message: 'Updated',
      data: updated
    });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await services.delete(id);
    if (deleted) {
      return res.status(200).json({
        message: 'deleted',
        data: deleted
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
