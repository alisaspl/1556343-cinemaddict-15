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

function render(container, htmlContent, position){
  container.insertAdjacentHTML(position, htmlContent);
}

const mainContainer = document.querySelector('.main');
const filmsContainer = mainContainer.querySelector('.films');
const filmsListContainer = filmsContainer.querySelector('.films-list');
const filmsListTopRatedContainer = filmsContainer.querySelector('.films-list-top-rated');
const filmsListMostCommentedContainer = filmsContainer.querySelector('.films-list-most-commented');

render(document.querySelector('.header__profile'), createUserProfileTemplate(), 'beforeend');
render(mainContainer.querySelector('.main-navigation'), createMenuTemplate(), 'beforeend');
render(mainContainer.querySelector('.sort-menu-container'), createSortMenuTemplate(), 'beforeend');
render(document.querySelector('.footer__statistics'), createFilmsStatisticsTemplate(), 'beforeend');
render(filmsContainer.querySelector('.films-list'), createFilmListTemplate(), 'beforeend');
render(filmsListTopRatedContainer, createFilmExtraTopRatedTemplate(), 'beforeend');
render(filmsListMostCommentedContainer, createFilmExtraMostCommentedTemplate(), 'beforeend');
render(mainContainer.querySelector('.statistic'), createStatisticsTemplate(), 'beforeend');
render(document.querySelector('.film-details'), createFilmDetailsTemplate(), 'beforeend');

for(let i = 0; i < 5; i++){
  render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  render(filmsListTopRatedContainer.querySelector('.films-list__container'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  render(filmsListMostCommentedContainer.querySelector('.films-list__container'), createFilmCardTemplate(), 'beforeend');
}
