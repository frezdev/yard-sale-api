const Joi = require('joi');

const id          = Joi.string().uuid();
const name        = Joi.string().min(3).max(25);
const price       = Joi.number().integer().min(10);
const image       = Joi.string().uri();
const isBlock     = Joi.boolean();
const description = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
  description: description.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock
});

const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = {
  updateProductSchema,
  createProductSchema,
  getProductSchema
};