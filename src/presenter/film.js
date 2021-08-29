import utilsRender from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import FilmCommentsView from '../view/film-comments';
import FilmCommentView from '../view/film-comment';

class FilmPresenter {
  constructor(container, film, isInWatchListCallback, isWatchedCallback, isFavoriteCallback) {
    this._film = film;
    this._container = container;
    this._isInWatchListCallback = isInWatchListCallback;
    this._isWatchedCallback = isWatchedCallback;
    this._isFavoriteCallback = isFavoriteCallback;

    this.filmCard = null;
    this.filmCardDetails = null;

    this._renderFilmCard();

    this._closeByEscape = this._closeByEscape.bind(this);
  }

  _renderFilmCard() {
    this.filmCard = new FilmCardView(this._film, this._showFilmDetails.bind(this),
      () => {
        this.filmCard.isInWatchList = !this._film.isInWatchList;
        this._isInWatchListCallback(this.filmCard.isInWatchList);
      },
      () => {
        this.filmCard.isWatched = !this._film.isWatched;
        this._isWatchedCallback(this.filmCard.isWatched);
      },
      () => {
        this.filmCard.isFavorite = !this._film.isFavorite;
        this._isFavoriteCallback(this.filmCard.isFavorite);
      },
    );
    utilsRender.renderView(this._container, this.filmCard);
  }

  _showFilmDetails() {
    this.filmCardDetails = new FilmDetailsView(this._film, this._hideFilmDetails.bind(this),
      () => {
        this.filmCardDetails.isInWatchList = !this._film.isInWatchList;
        this._isInWatchListCallback(this.filmCardDetails.isInWatchList);
      },
      () => {
        this.filmCardDetails.isWatched = !this._film.isWatched;
        this._isWatchedCallback(this.filmCardDetails.isWatched);
      },
      () => {
        this.filmCardDetails.isFavorite = !this._film.isFavorite;
        this._isFavoriteCallback(this.filmCardDetails.isFavorite);
      },
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

    if(FilmPresenter.currentOpenedFilmDetailsView) {
      FilmPresenter.currentOpenedFilmDetailsView.removeElement();
      this._hideFilmDetails();
    }
    FilmPresenter.currentOpenedFilmDetailsView = this.filmCardDetails;
    document.addEventListener('keydown', this._closeByEscape);
    document.body.classList.add('hide-overflow');
  }

  _hideFilmDetails() {
    FilmPresenter.currentOpenedFilmDetailsView = null;
    document.removeEventListener('keydown', this._closeByEscape);
    document.body.classList.remove('hide-overflow');
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if(FilmPresenter.currentOpenedFilmDetailsView) {
        FilmPresenter.currentOpenedFilmDetailsView.removeElement();
        this._hideFilmDetails();
      }
    }
  }
}
export default FilmPresenter;
