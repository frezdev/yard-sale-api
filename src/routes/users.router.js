const { Router } = require('express');
const UsersService = require('../services/users.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema
} = require('../schemas/user.schema');

const usersRouter = Router();

const services = new UsersService();

usersRouter.get('/', async (req, res) => {
  // const { limit, offset } = req.query;
  const users = await services.find();
  res.status(200).json({length: users.length, users});
});

usersRouter.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await services.findOne(id);
      if (user) return res.status(200).json(user);
      res.status(404).send({ message: 'Not foud' });
    } catch (error) {
      res.status(400).send({error});
    }
  }
);

usersRouter.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    try {
      const { body } = req;
      const newUser = await services.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send({
        message: 'ocurrió un error en el registro',
        error
      });
    }
  }
);

usersRouter.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updated = await services.update(id, body);
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
  }
);

usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await services.delete(id);
    res.status(204).json({
      message: 'deleted',
      deleted
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = usersRouter;
