import { createFilmDetailsTemplate } from './view/film-details';
import { createFilmListTemplate } from './view/film-list';
import { createFilmExtraTemplate } from './view/film-extra';
import { createMenuTemplate } from './view/menu';
import { createSortMenuTemplate } from './view/sort-menu';
import { createStatisticsTemplate } from './view/statistics';
import { createFilmsStatisticsTemplate } from './view/films-statistics';
import { createUserProfileTemplate } from './view/user-profile';
import { createFilmCardTemplate } from './view/film-card';

function renderToDOM(container, htmlContent, position){
  container.insertAdjacentHTML(position, htmlContent);
}

const mainContainer = document.querySelector('.main');
const filmsContainer = mainContainer.querySelector('.films');

renderToDOM(document.querySelector('.header'), createUserProfileTemplate(), 'beforeend');
renderToDOM(mainContainer.querySelector('#menu-slot'), createMenuTemplate(), 'beforeend');
renderToDOM(mainContainer.querySelector('#sort-slot'), createSortMenuTemplate(), 'beforeend'); // FIXME
renderToDOM(document.querySelector('#footer-statistics-slot'), createFilmsStatisticsTemplate(), 'beforeend');
renderToDOM(filmsContainer.querySelector('#film-list-slot'), createFilmListTemplate(), 'beforeend');
renderToDOM(filmsContainer.querySelector('#film-list-extra-slot'), createFilmExtraTemplate(), 'beforeend');
renderToDOM(mainContainer.querySelector('#statistic-slot'), createStatisticsTemplate(), 'beforeend');
renderToDOM(document.querySelector('#film-details-slot'), createFilmDetailsTemplate(), 'beforeend');

for(let i = 0; i < 5; i++){
  renderToDOM(filmsContainer.querySelector('#film-list-slot').querySelector('.films-list__container'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  renderToDOM(filmsContainer.querySelector('.films-list-top-rated'), createFilmCardTemplate(), 'beforeend');
}
for(let i = 0; i < 2; i++){
  renderToDOM(filmsContainer.querySelector('.films-list-most-commented'), createFilmCardTemplate(), 'beforeend');
}
