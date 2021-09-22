import utilsRender from '../utils/render';
import utils from '../utils/common';

import FilmsModel from '../model/films';

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
          if(this._mostCommentedView !== null) {
            this._mostCommentedView.removeElement();
            this._mostCommentedView = null;
          }
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
    if(this._topRatedView !== null) {
      this._topRatedView.removeElement();
      this._topRatedView = null;
    }
    if(this._mostCommentedView !== null) {
      this._mostCommentedView.removeElement();
      this._mostCommentedView = null;
    }
  }

  _renderTopRated() {
    if(this._topRatedView !== null) {
      this._topRatedView.removeElement();
      this._topRatedView = null;
    }
    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => parseFloat(film.totalRating),
    );

    if(films.length === 0 || parseFloat(films[0].totalRating) === 0.0) {
      return;
    }

    let topRatedFilms = [];
    if(films.length > 2 && !(films.some((element) => element.totalRating !== films[0].totalRating))) {
      const firstFilm = utils.getRandomElementFromArray(films);
      let secondFilm = utils.getRandomElementFromArray(films);
      while(firstFilm.id === secondFilm.id){
        secondFilm = utils.getRandomElementFromArray(films);
      }
      topRatedFilms.push(firstFilm, secondFilm);
    } else {
      topRatedFilms = films.slice(0,2);
    }

    this._topRatedView = new FilmExtraTopRatedView();
    for(const film of topRatedFilms){
      this._renderFilmCard(film, this._topRatedView, 'top_rated');
    }
    utilsRender.renderView(this._container, this._topRatedView);
  }

  _renderMostCommented() {
    if(this._mostCommentedView !== null) {
      this._mostCommentedView.removeElement();
      this._mostCommentedView = null;
    }

    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => film.comments.length,
    );

    if(films.length === 0 || films[0].comments.length === 0) {
      return;
    }

    let mostCommentedFilms = [];
    if(films.length > 2 && !(films.some((element) => element.comments.length !== films[0].comments.length))) {
      const firstFilm = utils.getRandomElementFromArray(films);
      let secondFilm = utils.getRandomElementFromArray(films);
      while(firstFilm.id === secondFilm.id){
        secondFilm = utils.getRandomElementFromArray(films);
      }
      mostCommentedFilms.push(firstFilm, secondFilm);
    } else {
      mostCommentedFilms = films.slice(0,2);
    }

    this._mostCommentedView = new FilmExtraMostCommentedView();
    for(const film of mostCommentedFilms) {
      this._renderFilmCard(film, this._mostCommentedView, 'most_commented');
    }

    utilsRender.renderView(this._container, this._mostCommentedView);
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
