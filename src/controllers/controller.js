// import User from '../models/model';
import { User } from '../database/models';

class UsersController {
  createUser(login, password, age) {
    this.user = User.create({ login, password, age });
    return this.user;
  }

  getAllUsers() {
    return User.findAll();
  }

  updateUser(id, query) {
    const currentUser = this.getUser(id);
    if (currentUser) {
      return User.update(query, { where: { id } });
    }
    return false;
  }

  deleteUser(id) {
    const currentUser = this.getUser(id);
    if (currentUser) {
      return User.update({ isDeleted: true }, { where: { id } });
    }
    return false;
  }

  async getUser(id) {
    this.currentUser = await User.findAll({ where: { id } });
    if (this.currentUser) {
      return this.currentUser;
    }

    return false;
  }

  getAutoSuggestUsers(loginSubstring, limit) {
    const regex = RegExp(`^${loginSubstring}`, 'i');

    const users = this.getAllUsers();

    const userSuggestions = users.filter((user) => regex.test(user.login));

    if (limit) {
      return userSuggestions.slice(0, limit);
    }

    return userSuggestions;
  }
}

export default UsersController;
