import he from 'he';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import AbstractView from './abstract';

class FilmComment extends AbstractView {
  constructor(comment, index, onDeleteCallback) {
    super();
    this._comment = comment;
    this._index = index;
    this._deleteButton = null;
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._onDeleteCallback = onDeleteCallback;
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./${this._comment.emoji.src}" width="55" height="55" alt="emoji-${this._comment.emoji.name}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.escape(this._comment.text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._comment.author}</span>
            <span class="film-details__comment-day">${dayjs().from(dayjs(this._comment.date))}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  }

  getElement() {
    super.getElement();
    this._deleteButton = this._element.querySelector('.film-details__comment-delete');
    this._deleteButton.addEventListener('click', this._commentDeleteHandler);

    return this._element;
  }

  removeElement() {
    if(this._element !== null) {
      this._deleteButton.removeEventListener('click', this._commentDeleteHandler);
    }
    super.removeElement();
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    this._onDeleteCallback(this._index);
  }

}

export default FilmComment;
