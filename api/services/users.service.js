const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }
  }

  // crear un nuevo usuario
  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.users.push(newUser);
    return newUser;
  }

  // obtener todos los usuarios
  async find() {
    return this.users;
  }

  // obtener un usuario por su id
  async findOne(id) {
    return this.users.find(
      user => user.id === id
    );
  }

  // actualizar la información de un usuario
  async update(id, data) {
    const index = this.users.findIndex(
      user => user.id === id
    );
    if (index === -1) {
      throw new Error('user not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...data
    };

    return this.users[index];
  }

  // eliminar un usuario
  async delete(id) {
    const index = this.users.findIndex(
      user => user.id === id
    );
    if (index == -1) {
      throw new Error('Not found');
    }

    const deleted = { ...this.users[index]};
    this.users.splice(index, 1);

    return { deleted };
  }
}

module.exports = UsersService;
