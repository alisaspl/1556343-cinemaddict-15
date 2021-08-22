import utilsRender from '../utils/render';
import AbstractView from '../view';

import FilmCommentsView from './film-comments';

class FilmsDetailsView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this.closeByEscape = this.closeByEscape.bind(this);

    if(FilmsDetailsView.currentOpenedFilmDetailsView) {
      FilmsDetailsView.currentOpenedFilmDetailsView.removeElement();
    }
    FilmsDetailsView.currentOpenedFilmDetailsView = this;

    document.body.classList.add('hide-overflow');
  }

  closeByEscape(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if(FilmsDetailsView.currentOpenedFilmDetailsView) {
        FilmsDetailsView.currentOpenedFilmDetailsView.removeElement();
      }
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
              <button type="button" class="film-details__control-button film-details__control-button--watchlist ${this._film.isInWatchList ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button film-details__control-button--watched ${this._film.isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button film-details__control-button--favorite ${this._film.isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
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
      utilsRender.renderView(
        this._element.querySelector('.film-details__bottom-container'),
        new FilmCommentsView(this._film.comments),
      );
      this._element.querySelector('.film-details__close').addEventListener('click', this.removeElement.bind(this));
      document.addEventListener('keydown', this.closeByEscape);
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    super.removeElement();
    FilmsDetailsView.currentOpenedFilmDetailsView = null;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.closeByEscape);
  }
}

export default FilmsDetailsView;
