import utilsRender from './utils/render';

import config from './config';

import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

import MenuPresenter from './presenter/menu';
import UserPresenter from './presenter/user';
import FilmListPresenter from './presenter/film-list';
import FilmDetailsPresenter from './presenter/film-details';

import MenuModel from './model/menu';
import UserModel from './model/user';
import FilmsModel from './model/films';
import CommentsModel from './model/comments';

import FilmsStatisticsView from './view/films-statistics';

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer__statistics');

const api = new Api();
const storage = new Store(config.STORAGE_NAME, window.localStorage);
const provider = new Provider(api, storage);

const filmsModel = new FilmsModel(provider);
const commentsModel = new CommentsModel(provider, filmsModel);
const menuModel = new MenuModel();
const userModel = new UserModel(filmsModel);

const filmDetailsPresenter = new FilmDetailsPresenter(mainContainer, filmsModel, commentsModel);
new MenuPresenter(mainContainer, menuModel, filmsModel, userModel);
new FilmListPresenter(mainContainer, filmsModel, menuModel, filmDetailsPresenter);
new UserPresenter(headerContainer, userModel);
const filmsStatisticsView = new FilmsStatisticsView(0);
utilsRender.renderView(footerContainer, filmsStatisticsView);

provider.getFilms().then((films) => {
  filmsModel.setFilms(films);

  filmsStatisticsView.removeElement();
  utilsRender.renderView(footerContainer, new FilmsStatisticsView(films.length));
});

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  provider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
