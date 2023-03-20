const { Router } = require('express');
const ProductsService = require('../services/products.service');

const productsRouter = Router();

const services = new ProductsService();

productsRouter.get('/', (req, res) => {
  const products = services.find();
  res.json({length: products.length, products});
});

productsRouter.get('/filter', (req, res) => {
  res.send('this is a filter');
});

productsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = services.findOne(id);

  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({
    message: 'Not found'
  });
});

productsRouter.post('/', (req, res) => {
  const { body } = req;
  const newProduct = services.create(body);
  res.status(201).json(newProduct);
});

productsRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updated = services.update(id, { ...body });

  res.json(updated);
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = services.delete(id);
    res.status(204).json(deleted);
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = productsRouter;
