import utilsRender from './utils/render';

import MenuPresenter from './presenter/menu';

import MenuModel from './model/menu';
import UserModel from './model/user';
import FilmsModel from './model/films';

import FilmsStatisticsView from './view/films-statistics';
import UserProfileView from './view/user-profile';

import { filmListData, menuData, filmsStatisticsData, userData } from './mocks.js';

const mainContainer = document.querySelector('.main');

utilsRender.renderView(document.querySelector('.header'), new UserProfileView(userData));
utilsRender.renderView(document.querySelector('.footer__statistics'), new FilmsStatisticsView(filmsStatisticsData));

const menuModel = new MenuModel();
menuModel.setMenu(menuData);

const userModel = new UserModel();
userModel.setUser(userData);

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmListData);

new MenuPresenter(mainContainer, menuModel, filmsModel, userModel);
