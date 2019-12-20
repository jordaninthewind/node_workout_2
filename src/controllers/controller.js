import User from '../models/model';

class UsersController {
  constructor() {
    this.users = [];
  }

  createUser(login, password, age) {
    const newUser = new User(login, password, age);
    this.users.push(newUser);
    return newUser;
  }

  getUser(id) {
    return this.checkUserExists(id);
  }

  showAllUsers() {
    return this.users;
  }

  updateUser(id, login, password, age) {
    const currentUser = this.checkUserExists(id);
    currentUser.update(login, password, age);
    return currentUser;
  }

  deleteUser(id) {
    const currentUser = this.checkUserExists(id);
    currentUser.delete();
    return true;
  }

  checkUserExists(id) {
    const currentUser = this.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new Error('user not found');
    }

    return currentUser;
  }
}

export default UsersController;
