import utils from '../utils/common';
import utilsRender from '../utils/render';
import { sortMenuData } from '../mocks';
import StatisticsView from '../view/statistics';

class Statistics {
  constructor(container, user, films){
    this._container = container;
    this._data = {
      user,
      films,
      menu: sortMenuData,
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
      sortedGenresStatistics: [],
    };

    for(const film of this._data.films) {
      if(film.isInWatchList) {
        userFilmsStatistics.watchlist++;
      }
      if(film.isWatched) {
        userFilmsStatistics.watched++;
        userFilmsStatistics.runtime += film.runtime;
      }
      if(film.isFavorite) {
        userFilmsStatistics.favorites++;
      }

      for(const genre of film.genres){
        if(userFilmsStatistics.genres[genre]) {
          userFilmsStatistics.genres[genre]++;
        } else {
          userFilmsStatistics.genres[genre] = 1;
        }
      }
    }

    userFilmsStatistics.runtime = utils.formatTime(userFilmsStatistics.runtime);

    for(const key in userFilmsStatistics.genres) {
      userFilmsStatistics.sortedGenresStatistics.push({
        key,
        value: userFilmsStatistics.genres[key],
      });
    }
    userFilmsStatistics.sortedGenresStatistics.sort((a, b) => {
      if(a.value < b.value) {
        return 1;
      } else if(a.value > b.value) {
        return -1;
      }
      return 0;
    });
    userFilmsStatistics.topGenre = userFilmsStatistics.sortedGenresStatistics[0].key;

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

export default Statistics;
