const { Router } = require('express');
const ProductsService = require('../services/products.service');

const productsRouter = Router();

const services = new ProductsService();

productsRouter.get('/', (req, res) => {
  try {
    const products = services.find();
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

productsRouter.get('/filter', (req, res) => {
  res.send('this is a filter');
});

productsRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const product = services.findOne(id);
    if (product) return res.status(200).json(product);
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(400).send({error});
  }
});

productsRouter.post('/', (req, res) => {
  const { body } = req;

  try {
    const newProduct = services.create(body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send({
      message: 'ocurrió un error en el registro',
      error
    });
  }
});

productsRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = services.update(id, body);
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
    const deleted = services.delete(id);
    res.status(204).json({
      message: 'deleted',
      deleted
    });
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = productsRouter;
