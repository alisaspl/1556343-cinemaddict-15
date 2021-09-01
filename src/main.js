import FilmsStatisticsView from './view/films-statistics';
import UserProfileView from './view/user-profile';
import { filmListData, menuData, sortMenuData, filmsStatisticsData, userData } from './mocks.js';
import utilsRender from './utils/render';

import FilmListPresenter from './presenter/film-list';

const mainContainer = document.querySelector('.main');

utilsRender.renderView(document.querySelector('.header'), new UserProfileView(userData));
utilsRender.renderView(document.querySelector('.footer__statistics'), new FilmsStatisticsView(filmsStatisticsData));

const filmListPresenter = new FilmListPresenter(mainContainer);
filmListPresenter.init(filmListData, menuData, sortMenuData, userData, filmsStatisticsData);
