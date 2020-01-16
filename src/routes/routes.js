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
    (req, res) => {
      const user = controller.getUser(req.params.id);

      if (user) {
        res.send(user);
        return;
      }

      res.status(400).send('A user with this ID was not found.');
    },
  )
  .put(
    '/users/:id',
    userValidator.body(querySchema.userInfo),
    (req, res) => {
      const { id } = req.params;
      const { login, password, age } = req.body;

      if (controller.updateUser(id, login, password, age)) {
        res.send(`${login} updated successfully.`);
        return;
      }

      res.status(404).send('User was not found to update.');
    },
  )
  .delete('/users/:id', (req, res) => {
    if (controller.deleteUser(req.params.id)) {
      res.send('User deleted successfully.');
      return;
    }
    res.status(404).send('User not found to delete.');
  })
  .get('/users', (req, res) => {
    const users = controller.showAllUsers();
    if (users.length > 0) {
      res.send(users);
      return;
    }

    res.status(400).send('No users found.');
  })
  .post(
    '/users',
    userValidator.body(querySchema.userInfo),
    (req, res) => {
      const { login, password, age } = req.body;
      if (controller.createUser(login, password, age)) {
        res.send('User created.');
        return;
      }

      res.status(500).send('Request cannot be completed at this time.');
    },
  )

  .get('/search', (req, res) => {
    const { substring, limit } = req.body;
    const suggestedUsers = controller.getAutoSuggestUsers(substring, limit);

    if (!suggestedUsers.length) {
      res.status(404).send('No users match the request.');
      return;
    }
    res.send(suggestedUsers);
  });

export default router;
