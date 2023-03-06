const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send('Hola Mundo desde Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola Soy una nueva ruta');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;

  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl()
    });
  }
  res.json({length: products.length, products});
});

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl()
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if(limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros');
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server runing on port ${port}`);
});
