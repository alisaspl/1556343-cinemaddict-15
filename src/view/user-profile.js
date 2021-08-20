import utils from '../utils';

class UserProfileView {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  getTemplate() {
    const {rank, avatar} = this._user;
    return `
      <section class="header__profile profile">
        <p class="profile__rating">${rank}</p>
        <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default UserProfileView;
