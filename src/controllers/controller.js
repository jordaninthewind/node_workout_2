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

  getAutoSuggestUsers(loginSubstring, limit) {
    const regex = RegExp(`^${loginSubstring}*`, 'i');
    const userSuggestions = this.users.filter((user) => regex.test(user.login));
    if (limit) {
      return userSuggestions.slice(0, limit);
    }
    return userSuggestions;
  }
}

export default UsersController;
