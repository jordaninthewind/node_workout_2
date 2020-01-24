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
};

router
  .get(
    '/users/:id',
    (req, res) => {
      const user = controller.getUser(req.params.id);

      if (user) {
        res.json({ data: user });
        return;
      }

      res.status(404).json({ message: 'A user with this ID was not found.' });
    },
  )
  .put(
    '/users/:id',
    userValidator.body(querySchema.userInfo),
    (req, res) => {
      const { id } = req.params;
      const { login, password, age } = req.body;

      if (controller.updateUser(id, login, password, age)) {
        res.json({ message: `${login} updated successfully.` });
        return;
      }

      res.status(404).json({ message: 'User was not found to update.' });
    },
  )
  .delete('/users/:id', (req, res) => {
    if (controller.deleteUser(req.params.id)) {
      res.json({ message: 'User deleted successfully.' });
      return;
    }

    res.status(404).json({ message: 'User not found to delete.' });
  })
  .get('/users', (req, res) => {
    const users = controller.showAllUsers();
    if (users.length > 0) {
      res.json({ data: users });
      return;
    }

    res.status(400).json({ message: 'No users found.' });
  })
  .post(
    '/users',
    userValidator.body(querySchema.userInfo),
    (req, res) => {
      const { login, password, age } = req.body;
      const user = controller.createUser(login, password, age);
      if (user) {
        res.json({ message: 'User created.', data: user.id });
        return;
      }

      res.status(500).json({ message: 'User not created. Please try again.' });
    },
  )

  .get('/search', (req, res) => {
    const suggestedUsers = controller.getAutoSuggestUsers(req.body.substring, req.body.limit);

    if (suggestedUsers.length) {
      res.json({ data: suggestedUsers });
      return;
    }
    res.status(404).json({ message: 'No users match the request.' });
  });

export default router;
