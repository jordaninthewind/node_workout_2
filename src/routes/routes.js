import { Router } from 'express';
import Joi from 'joi';
import validator from 'express-joi-validation';

import UsersController from '../controllers/controller';

const controller = new UsersController();
const router = Router();
const userValidator = validator.createValidator({});

const querySchema = {
  userInfo: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number()
      .min(4)
      .max(130)
      .required(),
  }),
  findUser: Joi.object({
    id: Joi.string().required(),
  }),
};

router
  .get(
    '/users/:id',
    userValidator.params(querySchema.findUser),
    (req, res, next) => {
      const user = controller.getUser(req.params.id);

      if (user) {
        res.send(user);
      }

      res.status(400).send('A user with this ID was not found.');
    },
  )
  .put(
    '/users/:id',
    userValidator.query(querySchema.userInfo),
    userValidator.params(querySchema.findUser),
    (req, res, next) => {
      const { login, password, age } = req.query;
      const { id } = req.params;
      const updatedUser = controller.updateUser(id, login, password, age);
      if (updatedUser) {
        res.send(`${updatedUser.login} updated successfully.`);
      }

      res.status(404).send('User was not found to update.');
    },
  )
  .delete('/users/:id', (req, res, next) => {
    if (controller.deleteUser(req.params.id)) {
      res.send('User deleted successfully.');
    }
    res.status(404).send('User not found to delete.');
  })
  .get('/users', (req, res, next) => {
    const users = controller.showAllUsers();
    if (users.length > 0) {
      res.send(users);
    }

    res.status(400).send('No users found.');
  })
  .post(
    '/users',
    userValidator.query(querySchema.userInfo),
    (req, res, next) => {
      const { login, password, age } = req.query;
      if (controller.createUser(login, password, age)) {
        res.send('User created.');
      }

      res.status(500).send('Request cannot be completed at this time.');
    },
  )
  .get('/search', (req, res, next) => {
    const { substring, limit } = req.query;
    const suggestedUsers = controller.getAutoSuggestUsers(substring, limit);

    if (!suggestedUsers.length) {
      res.status(404).send('No users match the query');
      return;
    }

    res.send(suggestedUsers);
  });

export default router;
