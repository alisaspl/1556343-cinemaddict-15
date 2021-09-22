import he from 'he';

import utilsRender from '../utils/render';

import FilmsModel from '../model/films';
import FilmDetailsView from '../view/film-details';

class FilmDetails {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmModel = filmsModel;
    this._commentsModel = commentsModel;

    this._film = null;
    this._view = null;

    this._closeByEscape = this._closeByEscape.bind(this);
    this._submitComment = this._submitComment.bind(this);
    this._deleteCommentCallback = this._deleteCommentCallback.bind(this);

    FilmDetails.currentDetails = this;
  }

  _callCalback(property) {
    this._filmModel.updateFilm(this._film.id, property, !this._film[property]);
  }

  _show(film) {
    this._film = film;
    this._showFilmDetails();
  }

  _showFilmDetails() {
    if(this._view) {
      this._hideFilmDetails();
    }

    this._filmModel.addObserver((event, payload) => {
      if(event === FilmsModel.CHANGE_EVENT && this._view) {
        this._view[payload.property] = payload.value;
      }
    });

    this._commentsModel.getComments(this._film.id)
      .then((comments) => {
        this._view = new FilmDetailsView(this._film, comments,
          this._hideFilmDetails.bind(this),
          this._callCalback.bind(this, 'isInWatchList'),
          this._callCalback.bind(this, 'isWatched'),
          this._callCalback.bind(this, 'isFavorite'),
          this._deleteCommentCallback,
        );
        utilsRender.renderView(document.body, this._view);

        document.addEventListener('keydown', this._closeByEscape);
        document.addEventListener('keydown', this._submitComment);
        document.body.classList.add('hide-overflow');
      });
  }

  _hideFilmDetails() {
    document.removeEventListener('keydown', this._closeByEscape);
    document.removeEventListener('keydown', this._submitComment);
    document.body.classList.remove('hide-overflow');

    if(this._view !== null) {
      this._view.removeElement();
      this._view = null;
    }
  }

  _closeByEscape(event) {
    if(event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      if(FilmDetails.currentDetails) {
        this._hideFilmDetails();
      }
    }
  }

  _submitComment(event) {
    if(event.key === 'Enter' && event.ctrlKey) {
      if(this._view !== null) {
        this._view.addComment((newComment) =>

          this._commentsModel.add(this._film.id, {
            comment: he.escape(newComment.comment),
            emotion: newComment.emotion,
          }).then((comments) => {
            const scrollVal = this._view.getElement().scrollTop;
            this._view.updateData(comments);
            this._view.getElement().scroll({ top: scrollVal });
          }),

        );
      }
    }
  }

  _deleteCommentCallback(commentId) {
    return this._commentsModel.remove(this._film.id, commentId)
      .then((comments) => {
        const scrollVal = this._view.getElement().scrollTop;
        this._view.updateData(comments);
        this._view.getElement().scroll({ top: scrollVal });
      });
  }

  static show(id) {
    FilmDetails.currentDetails._show(FilmsModel.getFullFilm(id));
  }
}

FilmDetails.currentDetails = null;

export default FilmDetails;
