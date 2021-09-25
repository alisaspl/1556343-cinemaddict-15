import utilsRender from '../utils/render';

import FilmCardView from '../view/film-card';
import FilmDetailsPresenter from '../presenter/film-details';
import FilmsModel from '../model/films';

class Film {
  constructor(container, film, filmModel, renderAtIndex) {
    this._container = container;
    this._film = film;

    this._filmModel = filmModel;

    this._filmModel.addObserver((event, payload) => {
      if(event === FilmsModel.CHANGE_EVENT && payload.filmId === this._film.id && payload.property === 'comments') {
        this.filmCard.changeCommentsLength(payload.value.length);
      }
    });

    this.filmCard = null;
    this.renderFilmCard(renderAtIndex);
  }

  _callCalback(property) {
    this._filmModel.updateFilm(this._film.id, property, !this._film[property]);
  }

  renderFilmCard(renderAtIndex, container) {
    if(container) {
      this._container = container;
    }

    this.filmCard = new FilmCardView(this._film,
      (filmId) => {
        FilmDetailsPresenter.show(filmId);
      },
      this._callCalback.bind(this, 'isInWatchList'),
      this._callCalback.bind(this, 'isWatched'),
      this._callCalback.bind(this, 'isFavorite'),
    );
    if(renderAtIndex === 0) {
      utilsRender.renderView(this._container, this.filmCard, utilsRender.RenderPosition.AFTERBEGIN);
    } else if(!renderAtIndex) {
      utilsRender.renderView(this._container, this.filmCard);
    } else {
      const element = this._container.querySelectorAll('article')[renderAtIndex-1];
      if(element) {
        element.parentNode.insertBefore(this.filmCard.getElement(), element.nextSibling);
      }
    }
  }
}

export default Film;
