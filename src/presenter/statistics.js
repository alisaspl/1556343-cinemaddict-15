import dayjs from 'dayjs';

import utils from '../utils/common';
import utilsRender from '../utils/render';
import { filmsStatisticsData } from '../mocks';
import StatisticsView from '../view/statistics';

class Statistics {
  constructor(container, user, films){
    this._container = container;
    this._data = {
      user,
      films,
      menu: filmsStatisticsData.selectedMenu,
    };
    this._view = null;

    this._renderStatistics(this._computeStatistics(this._data.menu));
  }

  _computeStatistics(filter) {
    const userFilmsStatistics = {
      watched: 0,
      duration: 0,
      runtime: 0,
      genres: {},
      topGenre: '',
      sortedGenresStatistics: [],
    };

    let dateToCompare;
    if(filter === 'today') {
      dateToCompare = dayjs().startOf('day');
    } else if(filter === 'week') {
      dateToCompare = dayjs().subtract(1, 'week');
    } else if(filter === 'month') {
      dateToCompare = dayjs().subtract(1, 'month');
    } else if(filter === 'year') {
      dateToCompare = dayjs().subtract(1, 'year');
    }

    for(const film of this._data.films) {
      if((dateToCompare && dateToCompare.diff(dayjs(film.watchingDate)) >= 0) || !film.isWatched) {
        continue;
      }

      userFilmsStatistics.watched++;
      userFilmsStatistics.runtime += film.runtime;

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
    if(userFilmsStatistics.sortedGenresStatistics.length > 0) {
      userFilmsStatistics.topGenre = userFilmsStatistics.sortedGenresStatistics[0].key;
    }

    return userFilmsStatistics;
  }

  _renderStatistics(statData) {
    this._view = new StatisticsView(this._data.user, statData, this._data.menu, this._onFilterChange.bind(this));
    utilsRender.renderView(this._container, this._view);
  }

  _onFilterChange(filter) {
    this._data.menu = filter;
    this.remove();
    this._renderStatistics(this._computeStatistics(filter));
  }

  remove() {
    this._view.removeElement();
  }
}

export default Statistics;
