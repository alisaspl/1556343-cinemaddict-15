import { createFilmDetailsTemplate } from './view/film-details';
import { createFilmListTemplate } from './view/film-list';
import { createFilmExtraTopRatedTemplate } from './view/film-extra-top-rated';
import { createFilmExtraMostCommentedTemplate } from './view/film-extra-most-commented';
import { createMenuTemplate } from './view/menu';
import { createSortMenuTemplate } from './view/sort-menu';
import { createStatisticsTemplate } from './view/statistics';
import { createFilmsStatisticsTemplate } from './view/films-statistics';
import { UserProfileView } from './view/user-profile';
import { createFilmCardTemplate } from './view/film-card';
import { generateFilmData, generateMenuData, generateSortMenuData, generateStatisticsData, generateUserDate, formatDate } from './mocks.js';
import { renderElement, RenderPosition } from './utils.js';

const mainContainer = document.querySelector('.main');
const filmsContainer = mainContainer.querySelector('.films');
const filmsListContainer = filmsContainer.querySelector('.films-list');
const filmsListTopRatedContainer = filmsContainer.querySelector('.films-list-top-rated');
const filmsListMostCommentedContainer = filmsContainer.querySelector('.films-list-most-commented');

function render(container, htmlContent, position){
  container.insertAdjacentHTML(position, htmlContent);
}

const mockData = {
  user: generateUserDate(),
  films: new Array(20).fill().map(() => generateFilmData()),
  lastShownFilmIndex: 0,
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

const profile = new UserProfileView(mockData.user);
renderElement(document.querySelector('.header'), profile.getElement(), RenderPosition.BEFOREEND);

render(mainContainer.querySelector('.main-navigation'), createMenuTemplate(generateMenuData(), userFilmsStatistics), 'beforeend');
render(mainContainer.querySelector('.sort-menu-container'), createSortMenuTemplate(generateSortMenuData()), 'beforeend');
render(document.querySelector('.footer__statistics'), createFilmsStatisticsTemplate(generateStatisticsData()), 'beforeend');
render(filmsContainer.querySelector('.films-list'), createFilmListTemplate(generateFilmData()), 'beforeend');
render(filmsListTopRatedContainer, createFilmExtraTopRatedTemplate(generateFilmData()), 'beforeend');
render(filmsListMostCommentedContainer, createFilmExtraMostCommentedTemplate(generateFilmData()), 'beforeend');
render(mainContainer.querySelector('.statistic'), createStatisticsTemplate(generateStatisticsData(), mockData.user, userFilmsStatistics), 'beforeend');
//render(document.querySelector('.film-details'), createFilmDetailsTemplate(mockData.films[0]), 'beforeend');

const showMoreBtn = filmsContainer.querySelector('.films-list__show-more');
showMoreBtn.addEventListener('click', () => {
  const newLastIndex = mockData.lastShownFilmIndex + 5;

  for(; mockData.lastShownFilmIndex < newLastIndex; mockData.lastShownFilmIndex++){
    if(mockData.lastShownFilmIndex === mockData.films.length){
      break;
    }
    render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(mockData.films[mockData.lastShownFilmIndex]), 'beforeend');
  }

  if(mockData.lastShownFilmIndex === mockData.films.length){
    showMoreBtn.classList.add('visually-hidden');
  }
});

for(; mockData.lastShownFilmIndex < 5; mockData.lastShownFilmIndex++){
  render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(mockData.films[mockData.lastShownFilmIndex]), 'beforeend');
}

for(let i = 0; i < 2; i++){
  render(filmsListTopRatedContainer.querySelector('.films-list__container'), createFilmCardTemplate(mockData.films[i]), 'beforeend');
}
for(let i = 2; i < 4; i++){
  render(filmsListMostCommentedContainer.querySelector('.films-list__container'), createFilmCardTemplate(mockData.films[i]), 'beforeend');
}
