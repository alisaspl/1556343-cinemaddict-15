import utils from '../utils';

class FilmCommentView {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./${this._comment.emoji.src}" width="55" height="55" alt="emoji-${this._comment.emoji.name}">
        </span>
        <div>
          <p class="film-details__comment-text">${this._comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._comment.author}</span>
            <span class="film-details__comment-day">${this._comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmCommentView;
