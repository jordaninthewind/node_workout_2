import { Router } from 'express';
import Joi from 'joi';
import validator from 'express-joi-validation';

import UsersController from '../controllers/controller';

const userController = new UsersController();
const router = Router();
const userValidator = validator.createValidator({ passError: true });

const querySchema = {
  newUser: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number()
      .min(4)
      .max(130)
      .required(),
  }),
  updateUser: Joi.object({
    login: Joi.string(),
    password: Joi.string(),
    age: Joi.number()
      .min(4)
      .max(130),
  }),
};

router
  .get(
    '/users/:id',
    async (req, res) => {
      const user = await userController.getUser(req.params.id);

      if (user) {
        res.json(user);
        return;
      }

      res.status(404).json({ message: 'A user with this ID was not found.' });
    },
  )
  .put(
    '/users/:id',
    userValidator.body(querySchema.updateUser),
    async (req, res) => {
      const user = await userController.updateUser(req.params.id, req.body);
      if (user) {
        res.json({ message: 'User updated successfully.' });
        return;
      }

      res.status(404).json({ message: 'User was not found to update.' });
    },
  )
  .delete('/users/:id', async (req, res) => {
    const deletedUser = await userController.deleteUser(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully.' });
      return;
    }

    res.status(404).json({ message: 'User not found to delete.' });
  })
  .get('/users', async (req, res) => {
    const users = await userController.getAllUsers();

    if (users.length > 0) {
      res.json(users);
      return;
    }

    res.status(400).json({ message: 'No users found.' });
  })
  .post(
    '/users',
    userValidator.body(querySchema.newUser),
    async (req, res) => {
      const { login, password, age } = req.body;
      const user = await userController.createUser(login, password, age);
      if (user) {
        res.json({ message: 'User created.', id: user.id });
        return;
      }

      res.status(500).json({ message: 'User not created. Please try again.' });
    },
  )

  .get('/search', async (req, res) => {
    const { substring, limit } = req.query;
    const suggestedUsers = await userController.getAutoSuggestUsers(substring, limit);

    if (suggestedUsers.length) {
      res.json(suggestedUsers);
      return;
    }
    res.status(404).json({ message: 'No users match the request.' });
  });

export default router;
