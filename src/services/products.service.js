const faker = require('faker');
const boom = require('@hapi/boom');

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
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  // crear un nuevo producto
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // obtener todos los productos
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const availableProducts = this.products.filter(item => !item.isBlock);
          resolve(availableProducts);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  }

  // obtener un producto por su id
  async findOne(id) {
    const product = this.products.find(product => (
      product.id === id
    ));

    if (!product) throw boom.notFound('Product not found');
    if (product.isBlock) throw boom.conflict('Product is block');

    return product;
  }

  // actualizar la información de un producto
  async update(id, data) {
    const index = this.products.findIndex(
      product => product.id === id
    );
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products[index] = {
      ...this.products[index],
      ...data
    };

    return this.products[index];
  }

  // eliminar un producto
  async delete(id) {
    const index = this.products.findIndex(
      product => product.id === id
    );
    if (index == -1) {
      throw boom.notFound('Product not found');
    }

    const deleted = { ...this.products[index]};
    this.products.splice(index, 1);

    return { deleted };
  }
}

module.exports = ProductsService;
