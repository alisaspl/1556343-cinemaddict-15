import utils from '../utils/common';
import utilsRender from '../utils/render';
import config from '../config';

import SmartView from './smart';
import FilmCommentsView from '../view/film-comments';
import FilmCommentView from '../view/film-comment';

class FilmDetails extends SmartView {
  constructor(film, comments, closeCallback, addToWatchListCallback, markAsWatchedCallback, favoriteCallback, onDeleteCommentCallback) {
    super();
    this._film = film;
    this._comments = comments;
    this._closeCallback = closeCallback;
    this._addToWatchListCallback = addToWatchListCallback;
    this._markAsWatchedCallback = markAsWatchedCallback;
    this._favoriteCallback = favoriteCallback;
    this._onDeleteCommentCallback = onDeleteCommentCallback;

    this._isInWatchListButton = null;
    this._isWatchedButton = null;
    this._isFavoriteButton = null;

    this.commentsView = null;
    this.commentView = [];
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

  _dynamicSetter(property) {
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
                    <p class="film-details__total-rating">${this._film.totalRating.toFixed(1)}</p>
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
                    <td class="film-details__cell">${utils.formatDate(this._film.release.date)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${utils.formatTime(this._film.runtime)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._film.release.releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genre${this._film.genres.length === 1 ? '' : 's'}</td>
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

      this._element.querySelector('.film-details__close').addEventListener('click', this._closeCallback);

      this._isInWatchListButton.addEventListener('click', this._addToWatchListCallback);
      this._isWatchedButton.addEventListener('click', this._markAsWatchedCallback);
      this._isFavoriteButton.addEventListener('click', this._favoriteCallback);

      this.commentsView = new FilmCommentsView(this._comments);
      utilsRender.renderView(
        this._element.querySelector('.film-details__bottom-container'),
        this.commentsView,
      );

      const commentsContainer = this.commentsView.getElement().querySelector('.film-details__comments-list');
      for(const comment of this._comments) {
        this.commentView.push(new FilmCommentView(comment, this._onDeleteCommentCallback));
        utilsRender.renderView(commentsContainer, this.commentView[this.commentView.length - 1]);
      }
    }

    return this._element;
  }

  removeElement() {
    for(const commentView of this.commentView) {
      commentView.removeElement();
    }
    this.commentView = [];
    this.commentsView.removeElement();

    this._element.querySelector('.film-details__close').removeEventListener('click', this._closeCallback);

    this._isInWatchListButton.removeEventListener('click', this._addToWatchListCallback);
    this._isWatchedButton.removeEventListener('click', this._markAsWatchedCallback);
    this._isFavoriteButton.removeEventListener('click', this._favoriteCallback);

    super.removeElement();
  }

  updateData(comments) {
    this._comments = comments;
    super.updateElement();
  }

  restoreHandlers() {
  }

  addComment(callback) {
    const form = this._element.querySelector('form');
    if(form.disabled) {
      return;
    }

    const newComment = this.commentsView.addComment();
    if(!newComment) {
      return;
    }

    form.disabled = true;
    for(const input of form) {
      input.disabled = true;
    }

    callback(newComment).catch((err) => {
      form.disabled = false;
      for(const input of form) {
        input.disabled = false;
      }

      form.style.animation = `shake ${config.SHAKE_TIMEOUT / 1000}s`;
      setTimeout(() => {
        form.style.animation = '';
      }, config.SHAKE_TIMEOUT);
    });
  }

}

export default FilmDetails;
