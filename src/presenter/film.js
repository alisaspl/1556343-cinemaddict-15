import utilsRender from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';

class Film {
  constructor(container, film, isInWatchListCallback, isWatchedCallback, isFavoriteCallback, filmCommentsChangeCallback) {
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
    this._submitComment = this._submitComment.bind(this);
    this._deleteCommentCallback = this._deleteCommentCallback.bind(this);
    this._filmCommentsChange = filmCommentsChangeCallback;
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
      this._deleteCommentCallback,
    );

    utilsRender.renderView(document.body, this.filmCardDetails);

    if(Film.currentOpenedFilmDetailsView) {
      this._hideFilmDetails();
    }
    Film.currentOpenedFilmDetailsView = this.filmCardDetails;
    document.addEventListener('keydown', this._closeByEscape);
    document.addEventListener('keydown', this._submitComment);

    document.body.classList.add('hide-overflow');
  }

  _hideFilmDetails() {
    Film.currentOpenedFilmDetailsView.removeElement();
    Film.currentOpenedFilmDetailsView = null;
    document.removeEventListener('keydown', this._closeByEscape);
    document.removeEventListener('keydown', this._submitComment);

    document.body.classList.remove('hide-overflow');
  }

  _closeByEscape(evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if(Film.currentOpenedFilmDetailsView) {
        this._hideFilmDetails();
      }
    }
  }

  _submitComment(evt) {
    if(evt.key === 'Enter' && evt.ctrlKey) {
      if(this.filmCardDetails !== null) {
        const newComment = this.filmCardDetails.commentsView.addComment();
        if(!newComment) {
          return;
        }
        this._film.comments.push({
          text: newComment.text,
          emoji: {
            src: newComment.src,
            name: newComment.name,
          },
          author: 'Bob',
          date: new Date(),
        });

        this._filmCommentsChange(this._film.comments.length);

        const scrollVal = this.filmCardDetails.getElement().scrollTop;
        this.filmCardDetails.updateData();
        this.filmCardDetails.getElement().scroll({ top: scrollVal });
      }
    }
  }

  _deleteCommentCallback(commentToDelete) {
    this._film.comments.splice(commentToDelete, 1);
    this._filmCommentsChange(this._film.comments.length);

    const scrollVal = this.filmCardDetails.getElement().scrollTop;
    this.filmCardDetails.updateData();
    this.filmCardDetails.getElement().scroll({ top: scrollVal });
  }

}
export default Film;
