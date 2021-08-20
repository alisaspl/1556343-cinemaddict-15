import FilmsListView from './view/film-list';
import MenuView from './view/menu';
import SortMenuView from './view/sort-menu';
//import StatisticsView from './view/statistics';
import FilmsStatisticsView from './view/films-statistics';
import UserProfileView from './view/user-profile';
import {generateFilmData, generateMenuData, generateSortMenuData, generateStatisticsData, generateUserDate, formatDate } from './mocks.js';
import utils from './utils';

const mainContainer = document.querySelector('.main');

const mockData = {
  user: generateUserDate(),
  films: new Array(20).fill().map(() => generateFilmData()),
};

const userFilmsStatistics = {
  favorites: 0,
  watchlist: 0,
  watched: 0,
  duration: 0,
  runtime: 0,
  genres: {},
  topGenre: '',
};
for(const film of mockData.films) {
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
userFilmsStatistics.runtime = formatDate(userFilmsStatistics.runtime);
const maxGenresValue = Math.max(...Object.values(userFilmsStatistics.genres));
for(const key in userFilmsStatistics.genres) {
  if(userFilmsStatistics.genres[key] === maxGenresValue) {
    userFilmsStatistics.topGenre = key;
  }
}

const filmsStatisticsData = generateStatisticsData();
const menuData = generateMenuData();

const profileView = new UserProfileView(mockData.user);
const menuView = new MenuView(menuData, userFilmsStatistics);
const sortMenuView = new SortMenuView(generateSortMenuData());
const filmsStatisticsView = new FilmsStatisticsView(filmsStatisticsData);
//const statisticsView = new StatisticsView(filmsStatisticsData, mockData.user, userFilmsStatistics);

const filmsListView = new FilmsListView(mockData.films, menuData);

utils.renderElement(document.querySelector('.header'), profileView.getElement());
utils.renderElement(document.querySelector('.footer__statistics'), filmsStatisticsView.getElement());

utils.renderElement(mainContainer, menuView.getElement(), utils.RenderPosition.AFTERBEGIN);
utils.renderElement(mainContainer, sortMenuView.getElement());

//utils.renderElement(mainContainer, statisticsView.getElement());

utils.renderElement(mainContainer, filmsListView.getElement());
