import utilsRender from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import FilmCommentsView from '../view/film-comments';
import FilmCommentView from '../view/film-comment';

class Film {
  constructor(container, film, isInWatchListCallback, isWatchedCallback, isFavoriteCallback) {
    this._film = film;
    this._container = container;
    this._callbacks = {
      isInWatchList: isInWatchListCallback,
      isWatched: isWatchedCallback,
      isFavorite: isFavoriteCallback,
    };

    this.filmCard = null;
    this.filmCardDetails = null;

    this._renderFilmCard();

    this._closeByEscape = this._closeByEscape.bind(this);
  }

  _callCalback(view, property) {
    this[view][property] = !this._film[property];
    this._callbacks[property](this[view][property]);
  }

  _renderFilmCard() {
    this.filmCard = new FilmCardView(this._film, this._showFilmDetails.bind(this),
      this._callCalback.bind(this, 'filmCard', 'isInWatchList'),
      this._callCalback.bind(this, 'filmCard', 'isWatched'),
      this._callCalback.bind(this, 'filmCard', 'isFavorite'),
    );
    utilsRender.renderView(this._container, this.filmCard);
  }

  _showFilmDetails() {
    this.filmCardDetails = new FilmDetailsView(this._film, this._hideFilmDetails.bind(this),
      this._callCalback.bind(this, 'filmCardDetails', 'isInWatchList'),
      this._callCalback.bind(this, 'filmCardDetails', 'isWatched'),
      this._callCalback.bind(this, 'filmCardDetails', 'isFavorite'),
    );
    utilsRender.renderView(document.body, this.filmCardDetails);

    this._filmComments = new FilmCommentsView(this._film.comments);
    utilsRender.renderView(
      this.filmCardDetails.getElement().querySelector('.film-details__bottom-container'),
      this._filmComments,
    );

    const container = this._filmComments.getElement().querySelector('.film-details__comments-list');
    for(const comment of this._film.comments) {
      utilsRender.renderView(container, new FilmCommentView(comment));
    }

    if(Film.currentOpenedFilmDetailsView) {
      Film.currentOpenedFilmDetailsView.removeElement();
      this._hideFilmDetails();
    }
    Film.currentOpenedFilmDetailsView = this.filmCardDetails;
    document.addEventListener('keydown', this._closeByEscape);
    document.body.classList.add('hide-overflow');
  }

  _hideFilmDetails() {
    Film.currentOpenedFilmDetailsView = null;
    document.removeEventListener('keydown', this._closeByEscape);
    document.body.classList.remove('hide-overflow');
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if(Film.currentOpenedFilmDetailsView) {
        Film.currentOpenedFilmDetailsView.removeElement();
        this._hideFilmDetails();
      }
    }
  }
}
export default Film;
