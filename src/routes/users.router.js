const { Router } = require('express');
const UsersService = require('../services/users.service');

const usersRouter = Router();

const services = new UsersService();

usersRouter.get('/', (req, res) => {
  // const { limit, offset } = req.query;
  const users = services.find();
  res.status(200).json({length: users.length, users});
});

usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = services.findOne(id);
    if (user) return res.status(200).json(user);
    res.status(404).send({ message: 'Not foud' });
  } catch (error) {
    res.status(400).send({error});
  }
});

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  try {
    const newUser = services.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send({
      message: 'ocurrió un error en el registro',
      error
    });
  }
});

usersRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updated = services.update(id, body);
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
});

usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const deleted = services.delete(id);
    res.status(204).json({
      message: 'deleted',
      deleted
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = usersRouter;
