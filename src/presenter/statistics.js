import utils from '../utils/common';
import utilsRender from '../utils/render';

import StatisticsView from '../view/statistics';

class StatisticsPresenter {
  constructor(container, user, films, menu){
    this._container = container;
    this._data = {
      user,
      films,
      menu,
    };
    this._view = null;

    this._renderStatistics();
  }

  _computeStatistics() {
    const userFilmsStatistics = {
      favorites: 0,
      watchlist: 0,
      watched: 0,
      duration: 0,
      runtime: 0,
      genres: {},
      topGenre: '',
    };

    for(const film of this._data.films) {
      if(film.isInWatchList) {
        userFilmsStatistics.watchlist++;
      }
      if(film.isWatched) {
        userFilmsStatistics.watched++;
        userFilmsStatistics.runtime += film.runtime.hours*60 + film.runtime.minutes;
      }
      if(film.isFavorite) {
        userFilmsStatistics.favorites++;

        for(const genre of film.genres){
          if(userFilmsStatistics.genres[genre]) {
            userFilmsStatistics.genres[genre]++;
          } else {
            userFilmsStatistics.genres[genre] = 1;
          }
        }
      }
    }
    userFilmsStatistics.runtime = utils.formatDate(userFilmsStatistics.runtime);
    const maxGenresValue = Math.max(...Object.values(userFilmsStatistics.genres));
    for(const key in userFilmsStatistics.genres) {
      if(userFilmsStatistics.genres[key] === maxGenresValue) {
        userFilmsStatistics.topGenre = key;
      }
    }

    return userFilmsStatistics;
  }

  _renderStatistics() {
    this._view = new StatisticsView(this._data.user, this._computeStatistics(), this._data.menu);
    utilsRender.renderView(this._container, this._view);
  }

  remove() {
    this._view.removeElement();
  }
}

export default StatisticsPresenter;
