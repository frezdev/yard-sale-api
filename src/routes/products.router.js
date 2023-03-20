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

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await services.findOne(id);
    if (product) return res.status(200).json(product);
  } catch (error) {
    res.status(404).send({error: error.message});
  }
});

productsRouter.post('/', async (req, res) => {
  const { body } = req;

  try {
    const newProduct = await services.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send({
      message: 'ocurrió un error en el registro',
      error
    });
  }
});

productsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = await services.update(id, body);
    res.status(201).json({
      message: 'Updated',
      data: updated
    });
  } catch (error) {
    res.status(400).send({
      message: 'ocurrió un error en el registro',
      error
    });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await services.delete(id);
    if (deleted) {
      return res.status(200).json({
        message: 'deleted',
        data: deleted
      });
    }
  } catch (error) {
    res.status(404).json({error: error.message});
  }
});

module.exports = productsRouter;
