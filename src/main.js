import FilmsStatisticsView from './view/films-statistics';
import UserProfileView from './view/user-profile';
import { filmListData, menuData, sortMenuData, filmsStatisticsData, userData } from './mocks.js';
import utils from './utils/common';
import utilsRender from './utils/render';

import FilmListPresenter from './presenter/film-list';

const mainContainer = document.querySelector('.main');

const userFilmsStatistics = {
  favorites: 0,
  watchlist: 0,
  watched: 0,
  duration: 0,
  runtime: 0,
  genres: {},
  topGenre: '',
};
for(const film of filmListData) {
  if(film.isInWatchList) {
    userFilmsStatistics.watchlist++;
  }
  if(film.isWatched) {
    userFilmsStatistics.watched++;
    userFilmsStatistics.runtime += film.runtime.hours*60 + film.runtime.minutes;
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
userFilmsStatistics.runtime = utils.formatDate(userFilmsStatistics.runtime);
const maxGenresValue = Math.max(...Object.values(userFilmsStatistics.genres));
for(const key in userFilmsStatistics.genres) {
  if(userFilmsStatistics.genres[key] === maxGenresValue) {
    userFilmsStatistics.topGenre = key;
  }
}

utilsRender.renderView(document.querySelector('.header'), new UserProfileView(userData));
utilsRender.renderView(document.querySelector('.footer__statistics'), new FilmsStatisticsView(filmsStatisticsData));

const filmListPresenter = new FilmListPresenter(mainContainer);
filmListPresenter.init(filmListData, menuData, sortMenuData, userData, userFilmsStatistics, filmsStatisticsData);
