import config from '../config';
import AbstractObserver from '../utils/abstract-observer';

import FilmsModel from './films';

class User extends AbstractObserver {
  constructor(filmsModel) {
    super();
    this._avatar = config.USER_AVATAR;
    this._rank = null;
    this._filmModel = filmsModel;

    this._filmModel.addObserver((event, payload) => {
      if(FilmsModel.INIT_EVENT === event || (FilmsModel.CHANGE_EVENT === event && payload.property === 'isWatched')) {
        this._recountRank();
      }
    });

    this._recountRank();
  }

  getUser() {
    return {
      rank: this._rank,
      avatar: this._avatar,
    };
  }

  _recountRank() {
    const films = this._filmModel.getFilms('isWatched');

    if(films.length === 0) {
      this._rank = 0;
    } else {
      for(const rankValue of config.USER_RANK_VALUES) {
        if(rankValue.min <= films.length && films.length <= rankValue.max) {
          this._rank = rankValue.value;
        }
      }
    }

    this._notify(User.CHANGE_EVENT, this.getUser());
  }
}

User.CHANGE_EVENT = Symbol('user change event');

export default User;
