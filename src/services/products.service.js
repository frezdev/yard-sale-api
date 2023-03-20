const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl()
      });
    }
  }

  // crear un nuevo producto
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // obtener todos los productos
  find() {
    return this.products;
  }

  // obtener un producto por su id
  findOne(id) {
    return this.products.find(
      product => product.id === id
    );
  }

  // actualizar la información de un producto
  update(id, data) {
    const index = this.products.findIndex(
      product => product.id === id
    );
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products[index] = {
      ...this.products[index],
      ...data
    };

    return this.products[index];
  }

  // eliminar un producto
  delete(id) {
    const index = this.products.findIndex(
      product => product.id === id
    );
    if (index == -1) {
      throw new Error('Not found');
    }

    // const deleted = { ...this.products[index]};
    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = ProductsService;
