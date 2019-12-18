import uuid from 'uuid';

class User {
  constructor(login, password, age) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }

  update(login, password, age) {
    this.login = login;
    this.password = password;
    this.age = age;
  }
}

export default User;
