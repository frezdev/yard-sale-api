const { Router } = require('express');

const categoriesRouter = Router();

categoriesRouter.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
});

module.exports = categoriesRouter;
