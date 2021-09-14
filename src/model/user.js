class User {
  constructor() {
    this._user = null;
  }

  getUser() {
    return this._user;
  }

  setUser(user) {
    this._user = user;
  }
}

export default User;
