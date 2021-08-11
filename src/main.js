import { createFilmDetailsTemplate } from './view/film-details';
import { createFilmListTemplate } from './view/film-list';
import { createFilmExtraTopRatedTemplate } from './view/film-extra-top-rated';
import { createFilmExtraMostCommentedTemplate } from './view/film-extra-most-commented';
import { createMenuTemplate } from './view/menu';
import { createSortMenuTemplate } from './view/sort-menu';
import { createStatisticsTemplate } from './view/statistics';
import { createFilmsStatisticsTemplate } from './view/films-statistics';
import { createUserProfileTemplate } from './view/user-profile';
import { createFilmCardTemplate } from './view/film-card';
import { generateFilmData, generateMenuData, generateSortMenuData, generateStatisticsData, generateUserDate } from './mocks.js';

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
  films: new Array(5).fill().map(() => generateFilmData()),
};

render(document.querySelector('.header__profile'), createUserProfileTemplate(mockData.user), 'beforeend');
render(mainContainer.querySelector('.main-navigation'), createMenuTemplate(generateMenuData()), 'beforeend');
render(mainContainer.querySelector('.sort-menu-container'), createSortMenuTemplate(generateSortMenuData()), 'beforeend');
render(document.querySelector('.footer__statistics'), createFilmsStatisticsTemplate(generateStatisticsData()), 'beforeend');
render(filmsContainer.querySelector('.films-list'), createFilmListTemplate(generateFilmData()), 'beforeend');
render(filmsListTopRatedContainer, createFilmExtraTopRatedTemplate(generateFilmData()), 'beforeend');
render(filmsListMostCommentedContainer, createFilmExtraMostCommentedTemplate(generateFilmData()), 'beforeend');
render(mainContainer.querySelector('.statistic'), createStatisticsTemplate(generateStatisticsData(), mockData.user), 'beforeend');
render(document.querySelector('.film-details'), createFilmDetailsTemplate(mockData.films[0]), 'beforeend');

const showMoreBtn = filmsContainer.querySelector('.films-list__show-more');
showMoreBtn.addEventListener('click', () => {
  for(let i = 0; i < 5; i++){
    render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(generateFilmData()), 'beforeend');
  }
});

for(const film of mockData.films){
  render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(film), 'beforeend');
}

for(let i = 0; i < 2; i++){
  render(filmsListTopRatedContainer.querySelector('.films-list__container'), createFilmCardTemplate(generateFilmData()), 'beforeend');
}
for(let i = 0; i < 2; i++){
  render(filmsListMostCommentedContainer.querySelector('.films-list__container'), createFilmCardTemplate(generateFilmData()), 'beforeend');
}
