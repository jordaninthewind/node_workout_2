import { Router } from 'express';
import Joi from 'joi';
import validator from 'express-joi-validation';

import UsersService from '../services/usersService';
import GroupsService from '../services/groupsService';

const usersService = new UsersService();
const groupsService = new GroupsService();
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
  // users routes
  .get('/users/:id', async (req, res) => {
    const user = await usersService.getUser(req.params.id);

    if (user) {
      res.json(user);
      return;
    }

    res.status(404).json({ message: 'A user with this ID was not found.' });
  })
  .put(
    '/users/:id',
    userValidator.body(querySchema.updateUser),
    async (req, res) => {
      const user = await usersService.updateUser(req.params.id, req.body);
      if (user) {
        res.json({ message: 'User updated successfully.' });
        return;
      }

      res.status(404).json({ message: 'User was not found to update.' });
    },
  )
  .delete('/users/:id', async (req, res) => {
    const deletedUser = await usersService.deleteUser(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully.' });
      return;
    }

    res.status(404).json({ message: 'User not found to delete.' });
  })
  .get('/users', async (req, res) => {
    const users = await usersService.getAllUsers();

    if (users.length > 0) {
      res.json(users);
      return;
    }

    res.status(400).json({ message: 'No users found.' });
  })
  .post('/users', userValidator.body(querySchema.newUser), async (req, res) => {
    const { login, password, age } = req.body;
    const user = await usersService.createUser(login, password, age);
    if (user) {
      res.json({ message: 'User created.', id: user.id });
      return;
    }

    res.status(500).json({ message: 'User not created. Please try again.' });
  })
  .get('/search', async (req, res) => {
    const { substring, limit } = req.query;
    const suggestedUsers = await usersService.getAutoSuggestUsers(
      substring,
      limit,
    );

    if (suggestedUsers.length) {
      res.json(suggestedUsers);
      return;
    }
    res.status(404).json({ message: 'No users match the request.' });
  })

  // TODO: add groups routes
  .get('/groups', async (req, res) => {
    const groups = await groupsService.getAllGroups();

    if (groups.length) {
      res.json(groups);
    }
    res.status(400).json({ message: 'No groups have been registered.' });
  })
  .get('/groups/:id', async (req, res) => {
    const group = await groupsService.getGroup(req.params.id);
    if (group) {
      res.json(group);
      return;
    }

    res.status(400).json({ message: 'No group with this ID exists.' });
  })
  .post('/groups', async (req, res) => {
    const { name, permissions } = req.body;
    const group = await groupsService.createGroup(name, permissions);
    if (group) {
      res.json({ message: 'Group created successfully', id: group.id });
      return;
    }

    res.status(500).json({ message: 'Group not created at this time, try again.' });
  })
  .put('/groups/:id', async (req, res) => {
    const group = await groupsService.updateGroup(req.params.id, req.body);

    if (group) {
      res.json({ message: 'Group updated successfully', id: group.id });
    }

    res.status(400).json({ message: 'Group not found.' });
  })
  .delete('/groups/:id', async (req, res) => {
    const deletedGroup = groupsService.deleteGroup(req.params.id);

    if (deletedGroup) {
      res.json({ message: 'Group deleted successfully.' });
      return;
    }

    res.status(400).json({ message: 'No group to delete with this ID.' });
  });
export default router;
