const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
      });
    }
  }

  // crear un nuevo usuario
  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.users.push(newUser);
    return newUser;
  }

  // obtener todos los usuarios
  find() {
    return this.users;
  }

  // obtener un usuario por su id
  findOne(id) {
    return this.users.find(
      user => user.id === id
    );
  }

  // actualizar la información de un usuario
  update(id, data) {
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
  delete(id) {
    const index = this.users.findIndex(
      user => user.id === id
    );
    if (index == -1) {
      throw new Error('Not found');
    }

    // const deleted = { ...this.users[index]};
    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UsersService;
