class Comments {
  constructor(api, filmsModel) {
    this._api = api;
    this._filmModel = filmsModel;

    this._comments = [];
  }

  add(filmId, comment) {
    return this._api.addComment(filmId, comment)
      .then((data) => {
        this._comments = data.comments;
        this._filmModel.updateFilm(filmId, 'comments', this._comments.map((commentElement) => commentElement.id));
        return this._comments;
      });
  }

  remove(filmId, commentId) {
    return this._api.removeComment(commentId)
      .then(() => {
        const commentIndex = this._comments.findIndex((comment) => comment.id === commentId);
        this._comments.splice(commentIndex, 1);
        this._filmModel.updateFilm(filmId, 'comments', this._comments.map((comment) => comment.id));
        return this._comments;
      });
  }

  getComments(filmId) {
    return this._api.getComments(filmId)
      .then((data) => {
        this._comments = data;
        return this._comments;
      });
  }
}

export default Comments;
