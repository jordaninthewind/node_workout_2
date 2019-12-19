import { Router } from 'express';
import Joi from 'joi';
import validator from 'express-joi-validation';

import UsersController from '../controllers/controller';

const controller = new UsersController();
const router = Router();
const userValidator = validator.createValidator({});

const newUserQuerySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
});

router
  .get(
    '/user/:id',
    (req, res, next) => {
      const user = controller.getUser(req.params.id);
      console.log(user);
      next();
    },
    (req, res, next) => {
      res.send('get request successful');
    },
  )
  .put('/user', (req, res, next) => {
    res.send(`put request successful to user ${req.params.id}`);
  })
  .delete('/user',
    (req, res, next) => {
      controller.deleteUser(req.params.id);
      next();
    },
    (req, res, next) => {
      res.send('delete request successful');
    });

router
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
    '/user', userValidator.query(newUserQuerySchema),
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
