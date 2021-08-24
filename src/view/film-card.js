import utilsRender from '../utils/render';
import AbstractView from './abstract';

import FilmsDetailsView from './film-details';

class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._showFilmDetails = this._showFilmDetails.bind(this);
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._film.title}</h3>
        <p class="film-card__rating">${this._film.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._film.release.date.split(' ')[2]}</span>
          <span class="film-card__duration">${this._film.runtime.hours > 0 ? `${this._film.runtime.hours}h` : ''} ${this._film.runtime.minutes}m</span>
          <span class="film-card__genre">${this._film.genres[0]}</span>
        </p>
        <img src="./${this._film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._film.description.length > 140 ? `${this._film.description.slice(0, 139)}...` : this._film.description}</p>
        <a class="film-card__comments">${this._film.comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${this._film.isInWatchList ? 'film-card__controls-item--active' : ''}" type="button">Add to
            watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${this._film.isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as
            watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${this._film.isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as
            favorite</button>
        </div>
      </article>
    `;
  }

  getElement() {
    if(this._element === null) {
      super.getElement();
      ['.film-card__title', '.film-card__poster', '.film-card__comments'].forEach((element) =>
        this._element.querySelector(element).addEventListener('click', this._showFilmDetails),
      );
    }
    return this._element;
  }

  _showFilmDetails() {
    utilsRender.renderView(document.body, new FilmsDetailsView(this._film));
  }
}

export default FilmCardView;
