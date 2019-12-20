import { Router } from 'express';
import Joi from 'joi';
import validator from 'express-joi-validation';

import UsersController from '../controllers/controller';

const controller = new UsersController();
const router = Router();
const userValidator = validator.createValidator({});

const querySchema = {
  newUser: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number()
      .min(4)
      .max(100)
      .required(),
  }),
  updateUser: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number()
      .min(4)
      .max(100)
      .required(),
  }),
  findUser: Joi.object({
    id: Joi.string().required(),
  }),
};

router
  .get(
    '/user/:id',
    userValidator.params(querySchema.findUser),
    (req, res, next) => {
      const user = controller.getUser(req.params.id);
      console.log(user);
      next();
    },
    (req, res, next) => {
      res.send('get request successful');
    },
  )
  .put(
    '/user/:id',
    userValidator.query(querySchema.newUser),
    userValidator.params(querySchema.findUser),
    (req, res, next) => {
      try {
        const { login, password, age } = req.query;
        const { id } = req.params;
        const updatedUser = controller.updateUser(id, login, password, age);
        console.log(updatedUser);
        res.send(`${updatedUser.login} updated successfully.`);
      } catch (error) {
        res.send('the user was not found.');
        next(error);
      }
    },
  )
  .delete(
    '/user/:id',
    (req, res, next) => {
      controller.deleteUser(req.params.id);
      next();
    },
    (req, res, next) => {
      res.send('delete request successful');
    },
  )
  .get(
    '/user',
    (req, res, next) => {
      const users = controller.showAllUsers();
      console.log(users);
      next();
    },
    (req, res, next) => {
      res.send('check the console.');
    },
  )
  .post(
    '/user',
    userValidator.query(querySchema.newUser),
    (req, res, next) => {
      const { login, password, age } = req.query;
      controller.createUser(login, password, age);
      next();
    },
    (req, res, next) => {
      res.send('post request successful');
    },
  );

export default router;
