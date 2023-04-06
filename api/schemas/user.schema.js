const Joi = require('joi');

const id = Joi.string().uuid();
const avatar = Joi.string().uri();
const email = Joi.string().email();
const name = Joi.string();

const createUserSchema = Joi.object({
  firstName: name.required(),
  lastName: name.required(),
  email: email.required(),
  avatar: avatar
});

const updateUserSchema = Joi.object({
  firstName: name,
  lastName: name,
  email: email,
  avatar: avatar
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = {
  updateUserSchema,
  createUserSchema,
  getUserSchema
};

// id: faker.datatype.uuid(),
// avatar: faker.image.avatar(),
// email: faker.internet.email(),
// firstName: faker.name.firstName(),
// lastName: faker.name.lastName(),