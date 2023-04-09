const boom = require('@hapi/boom');
const faker = require('faker');

class CategoriesSevice {
  constructor(products) {
    this.categories = [];
    this.generate(products);
  }

  async generate(products) {
    try {
      const categoriesName = products
        .map(product => product.category)
        .sort()
        .reduce((prev, category) => {
          !prev.includes(category) && prev.push(category);
          return prev;
        }, []);

      this.categories = categoriesName.map(name => {
        return { name, id: faker.datatype.uuid() };
      });
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async find() {
    return this.categories;
  }
}

module.exports = CategoriesSevice;