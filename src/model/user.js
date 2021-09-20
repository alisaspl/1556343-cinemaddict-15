import config from '../config';
import AbstractObserver from '../utils/abstract-observer';

import FilmsModel from './films';

class User extends AbstractObserver {
  constructor(filmsModel) {
    super();
    this._user = null;
    this._rank = null;
    this._filmModel = filmsModel;

    this._filmModel.addObserver((evt, payload) => {
      if(FilmsModel.CHANGE_EVENT === evt && payload.property === 'isWatched') {
        this._recountRank();
      }
    });

  }

  getUser() {
    return this._user;
  }

  setUser(user) {
    this._user = { avatar: user.avatar };
    this._recountRank();
  }

  _recountRank() {
    const films = this._filmModel.getFilms('isWatched');

    if(films.length === 0) {
      this._user.rank = 0;
    } else {
      for(const rankValue of config.USER_RANK_VALUES) {
        if(rankValue.min <= films.length && films.length <= rankValue.max) {
          this._user.rank = rankValue.value;
        }
      }
    }

    this._notify(User.CHANGE_EVENT, this._user);
  }
}

User.CHANGE_EVENT = Symbol('user change event');

export default User;
