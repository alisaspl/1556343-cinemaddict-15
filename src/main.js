import utilsRender from './utils/render';

import Api from './api';

import MenuPresenter from './presenter/menu';
import UserPresenter from './presenter/user';
import FilmListPresenter from './presenter/film-list';

import MenuModel from './model/menu';
import UserModel from './model/user';
import FilmsModel from './model/films';

import FilmsStatisticsView from './view/films-statistics';

import { filmListData, menuData, filmsStatisticsData, userData } from './mocks.js';

const mainContainer = document.querySelector('.main');

utilsRender.renderView(document.querySelector('.footer__statistics'), new FilmsStatisticsView(filmsStatisticsData));

const menuModel = new MenuModel();
menuModel.setMenu(menuData);

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmListData);

const userModel = new UserModel(filmsModel);
userModel.setUser(userData);

new UserPresenter(document.querySelector('.header'), userModel);
new MenuPresenter(mainContainer, menuModel, filmsModel, userModel);
new FilmListPresenter(mainContainer, filmsModel, menuModel);

const api = new Api();
api.getMovies();
