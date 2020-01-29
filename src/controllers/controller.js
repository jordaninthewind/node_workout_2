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

  showAllUsers() {
    return this.users;
  }

  updateUser(id, query) {
    const currentUser = this.getUser(id);
    if (currentUser) {
      currentUser.update(query);
      return currentUser;
    }

    return false;
  }

  deleteUser(id) {
    const currentUser = this.getUser(id);
    if (currentUser) {
      currentUser.delete();
      return true;
    }
    return false;
  }

  getUser(id) {
    const currentUser = this.users.find((user) => user.id === id);
    if (!currentUser) {
      return false;
    }

    return currentUser;
  }

  getAutoSuggestUsers(loginSubstring, limit) {
    const regex = RegExp(`^${loginSubstring}`, 'i');
    const userSuggestions = this.users.filter((user) => {
      if (regex.test(user.login)) {
        return user;
      }
    });

    if (limit) {
      return userSuggestions.slice(0, limit);
    }

    return userSuggestions;
  }
}

export default UsersController;
