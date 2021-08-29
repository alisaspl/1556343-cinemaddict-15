import AbstractView from './abstract';

class FilmDetailsView extends AbstractView {
  constructor(film, closeCallback, addToWatchListCallback, markAsWatchedCallback, favoriteCallback) {
    super();
    this._film = film;
    this._closeCallback = closeCallback;
    this._addToWatchListCallback = addToWatchListCallback;
    this._markAsWatchedCallback = markAsWatchedCallback;
    this._favoriteCallback = favoriteCallback;
    this.removeElement = this.removeElement.bind(this);


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
      this[`_${property}Button`].classList.add('film-details__control-button--active');
    } else {
      this[`_${property}Button`].classList.remove('film-details__control-button--active');
    }
  }

  getTemplate() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./${this._film.poster}" alt="">

                <p class="film-details__age">${this._film.ageRating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._film.title}</h3>
                    <p class="film-details__title-original">Original: ${this._film.originalTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._film.totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._film.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._film.writers.join(', ')}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._film.actors.join(', ')}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${this._film.release.date}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${this._film.runtime.hours > 0 ? `${this._film.runtime.hours}h` : ''} ${this._film.runtime.minutes}m</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._film.release.releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${this._film.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}
                  </tr>
                </table>

                <p class="film-details__film-description">
                  ${this._film.description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
            </section>
          </div>

          <div class="film-details__bottom-container"></div>
        </form>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      super.getElement();

      this._isInWatchListButton = this._element.querySelector('#watchlist');
      this.isInWatchList = this._film.isInWatchList;

      this._isWatchedButton = this._element.querySelector('#watched');
      this.isWatched = this._film.isWatched;

      this._isFavoriteButton = this._element.querySelector('#favorite');
      this.isFavorite = this._film.isFavorite;

      this._element.querySelector('.film-details__close').addEventListener('click', this.removeElement);

      this._isInWatchListButton.addEventListener('click', this._addToWatchListCallback);
      this._isWatchedButton.addEventListener('click', this._markAsWatchedCallback);
      this._isFavoriteButton.addEventListener('click', this._favoriteCallback);
    }

    return this._element;
  }

  removeElement() {
    this._element.querySelector('.film-details__close').removeEventListener('click', this.removeElement);

    this._isInWatchListButton.removeEventListener('click', this._addToWatchListCallback);
    this._isWatchedButton.removeEventListener('click', this._markAsWatchedCallback);
    this._isFavoriteButton.removeEventListener('click', this._favoriteCallback);

    this._element.remove();
    super.removeElement();
    this._closeCallback();
  }
}

export default FilmDetailsView;
