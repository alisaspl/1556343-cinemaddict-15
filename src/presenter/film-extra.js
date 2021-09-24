import config from '../config';

import utilsRender from '../utils/render';
import utils from '../utils/common';

import FilmsModel from '../model/films';

import AbstractView from '../view/abstract';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';

import FilmPresenter from './film';

class FilmExtra {
  constructor(container, filmModel) {
    this._container = container;
    this._filmModel = filmModel;

    this._topRatedView = null;
    this._mostCommentedView = null;

    this._filmPresenters = new Map();

    this._filmModel.addObserver((event, payload) => {
      if(event === FilmsModel.CHANGE_EVENT) {
        if(payload.property === 'comments') {
          FilmExtraMostCommentedView.removeView(this._mostCommentedView);
          this._renderMostCommented();
        } else {

          for(const key of this._filmPresenters.keys()){
            if(key.id === payload.filmId){
              const presenter = this._filmPresenters.get(key);
              if(presenter && presenter.filmCard !== null) {
                presenter.filmCard[payload.property] = payload.value;
              }
            }
          }

        }
      }
    });

    this._renderTopRated();
    this._renderMostCommented();
  }

  remove() {
    FilmExtraTopRatedView.removeView(this._topRatedView);
    FilmExtraMostCommentedView.removeView(this._mostCommentedView);
  }

  _renderFilmExtra(view, filmCardType, viewClass, sortCondition, renderCondition, getRandomFilmCondition) {
    AbstractView.removeView(view);
    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => sortCondition(film),
    );

    if(films.length === 0 || renderCondition(films[0])) {
      return;
    }

    let topFilms = [];
    if(films.length > config.EXTRA_FILMS_QUANTITY && !(films.some((element) => getRandomFilmCondition(element)))) {
      const firstFilm = utils.getRandomElementFromArray(films);
      let secondFilm = utils.getRandomElementFromArray(films);
      while(firstFilm.id === secondFilm.id) {
        secondFilm = utils.getRandomElementFromArray(films);
      }
      topFilms.push(firstFilm, secondFilm);
    } else {
      topFilms = films.slice(0, config.EXTRA_FILMS_QUANTITY);
    }

    view = new viewClass();
    for(const film of topFilms) {
      this._renderFilmCard(film, view, filmCardType);
    }
    utilsRender.renderView(this._container, view);
  }

  _renderTopRated() {
    this._renderFilmExtra(this._topRatedView, config.EXTRA_FILM_CARD_TYPE.TOP_RATED, FilmExtraTopRatedView,
      (film) => parseFloat(film.totalRating),
      (film) => parseFloat(film.totalRating) === 0.0,
      (nextFilm, film) => nextFilm.totalRating !== film.totalRating,
    );
  }

  _renderMostCommented() {
    this._renderFilmExtra(this._mostCommentedView, config.EXTRA_FILM_CARD_TYPE.MOST_COMMENTED, FilmExtraMostCommentedView,
      (film) => film.comments.length,
      (film) => film.comments.length === 0,
      (nextFilm, film) => nextFilm.comments.length !== film.comments.length,
    );
  }

  _renderFilmCard(film, view, type) {
    this._filmPresenters.set(
      {id: film.id, type},
      new FilmPresenter(
        view.getElement().querySelector('.films-list__container'),
        film,
        this._filmModel,
      ),
    );
  }

}

export default FilmExtra;
