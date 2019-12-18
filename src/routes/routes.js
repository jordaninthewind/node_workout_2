import User from '../models/model';
import UsersController from '../controllers/controller';

const controller = new UsersController();

const routes = (app) => {
  app
    .route('/user/:id')
    .get(
      (req, res, next) => {
        const user = controller.getUser(req.params.id);
        console.log(user);
        next();
      },
      (req, res, next) => {
        res.send('get request successful');
      },
    )
    .put((req, res, next) => {
      res.send(`put request successful to user ${req.params.id}`);
    })
    .delete(
      (req, res, next) => {
        controller.deleteUser(req.params.id);
        next();
      },
      (req, res, next) => {
        res.send('delete request successful');
      },
    );

  app
    .route('/user')
    .get(
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
      (req, res, next) => {
        controller.createUser('Jordan', 'Something', '1000');
        next();
      },
      (req, res, next) => {
        res.send('post request successful');
      },
    );
};

export default routes;
