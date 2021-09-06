import AbstractView from './abstract';

class UserProfile extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
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

}

export default UserProfile;
