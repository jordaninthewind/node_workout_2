import User from '../models/model';

class UsersController {
  constructor() {
    this.users = {};
  }

  createUser(login, password, age) {
    const newUser = new User(login, password, age);
    this.users[newUser.id] = newUser;
    return newUser;
  }

  getUser(id) {
    return this.users[id];
  }

  showAllUsers() {
    return this.users;
  }

  deleteUser(id) {
    this.users[id].delete();
  }

  updateUser(id, login, password, age) {
    return false;
  }
}

export default UsersController;
