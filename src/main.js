import { createFilmDetailsTemplate } from './view/film-details';
import { createFilmListTemplate } from './view/film-list';
import { createFilmExtraTemplate } from './view/film-extra';
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
const filmsListContainer = filmsContainer.querySelector('#film-list-slot');

render(document.querySelector('.header'), createUserProfileTemplate(), 'beforeend');
render(mainContainer.querySelector('#menu-slot'), createMenuTemplate(), 'beforeend');
render(mainContainer.querySelector('#sort-slot'), createSortMenuTemplate(), 'beforeend');
render(document.querySelector('#footer-statistics-slot'), createFilmsStatisticsTemplate(), 'beforeend');
render(filmsContainer.querySelector('#film-list-slot'), createFilmListTemplate(), 'beforeend');
render(filmsContainer.querySelector('#film-list-extra-slot'), createFilmExtraTemplate(), 'beforeend');
render(mainContainer.querySelector('#statistic-slot'), createStatisticsTemplate(), 'beforeend');
render(document.querySelector('#film-details-slot'), createFilmDetailsTemplate(), 'beforeend');

for(let i = 0; i < 5; i++){
  render(filmsListContainer.querySelector('.films-list__container'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  render(filmsContainer.querySelector('.films-list-top-rated'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  render(filmsContainer.querySelector('.films-list-most-commented'), createFilmCardTemplate(), 'beforeend');
}
