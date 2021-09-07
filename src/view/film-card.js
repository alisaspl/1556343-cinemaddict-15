import AbstractView from './abstract';

class FilmCard extends AbstractView {
  constructor(film, showFilmDetailsCallback, addToWatchListCallback, markAsWatchedCallback, favoriteCallback) {
    super();
    this._film = film;

    this._showFilmDetails = showFilmDetailsCallback;
    this._addToWatchListCallback = addToWatchListCallback;
    this._markAsWatchedCallback = markAsWatchedCallback;
    this._favoriteCallback = favoriteCallback;

    this._detailsViewOpenElements = ['.film-card__title', '.film-card__poster', '.film-card__comments'];

    this._isInWatchListButton = null;
    this._isWatchedButton = null;
    this._isFavoriteButton = null;
  }

  get isInWatchList() {
    return this._film.isInWatchList;
  }

  set isInWatchList(value) {
    this._dynamicSetter('isInWatchList', value);
  }

  get isWatched() {
    return this._film.isWatched;
  }

  set isWatched(value) {
    this._dynamicSetter('isWatched', value);
  }

  get isFavorite() {
    return this._film.isFavorite;
  }

  set isFavorite(value) {
    this._dynamicSetter('isFavorite', value);
  }

  _dynamicSetter(property, value) {
    this._film[property] = !!value;
    if(this._film[property]){
      this[`_${property}Button`].classList.add('film-card__controls-item--active');
    } else {
      this[`_${property}Button`].classList.remove('film-card__controls-item--active');
    }
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
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>
    `;
  }

  getElement() {
    if(this._element === null) {
      super.getElement();

      this._isInWatchListButton = this._element.querySelector('.film-card__controls-item--add-to-watchlist');
      this.isInWatchList = this._film.isInWatchList;

      this._isWatchedButton = this._element.querySelector('.film-card__controls-item--mark-as-watched');
      this.isWatched = this._film.isWatched;

      this._isFavoriteButton = this._element.querySelector('.film-card__controls-item--favorite');
      this.isFavorite = this._film.isFavorite;

      this._detailsViewOpenElements.forEach((element) =>
        this._element.querySelector(element).addEventListener('click', this._showFilmDetails),
      );
      this._isInWatchListButton.addEventListener('click', this._addToWatchListCallback);
      this._isWatchedButton.addEventListener('click', this._markAsWatchedCallback);
      this._isFavoriteButton.addEventListener('click', this._favoriteCallback);
    }
    return this._element;
  }

  removeElement() {
    this._detailsViewOpenElements.forEach((element) =>
      this._element.querySelector(element).removeEventListener('click', this._showFilmDetails),
    );
    this._isInWatchListButton.removeEventListener('click', this._addToWatchListCallback);
    this._isWatchedButton.removeEventListener('click', this._markAsWatchedCallback);
    this._isFavoriteButton.removeEventListener('click', this._favoriteCallback);
    super.removeElement();
  }
}

export default FilmCard;
