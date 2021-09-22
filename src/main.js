import utilsRender from './utils/render';

import Api from './api';

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

const filmsModel = new FilmsModel(api);
const commentsModel = new CommentsModel(api, filmsModel);
const menuModel = new MenuModel();
const userModel = new UserModel(filmsModel);

const filmDetailsPresenter = new FilmDetailsPresenter(mainContainer, filmsModel, commentsModel);
new MenuPresenter(mainContainer, menuModel, filmsModel, userModel);
new FilmListPresenter(mainContainer, filmsModel, menuModel, filmDetailsPresenter);
new UserPresenter(headerContainer, userModel);
const filmsStatisticsView = new FilmsStatisticsView(0);
utilsRender.renderView(footerContainer, filmsStatisticsView);

api.getFilms().then((films) => {
  filmsModel.setFilms(films);

  filmsStatisticsView.removeElement();
  utilsRender.renderView(footerContainer, new FilmsStatisticsView(films.length));
});
