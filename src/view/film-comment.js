import he from 'he';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import config from '../config';

import AbstractView from './abstract';

class FilmComment extends AbstractView {
  constructor(comment, onDeleteCallback) {
    super();
    this._comment = comment;
    this._onDeleteCallback = onDeleteCallback;

    this._deleteButton = null;
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
  }

  getTemplate() {
    return `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._comment.emotion}.png" width="55" height="55" alt="emoji-${this._comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.escape(he.unescape(this._comment.comment))}</p>
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
    this._deleteButton.innerText = 'Deleting...';
    this._deleteButton.disabled = true;
    this._onDeleteCallback(this._comment.id)
      .catch(() => {
        this._deleteButton.innerText = 'Delete';
        this._deleteButton.disabled = false;

        this.getElement().style.animation = `shake ${config.SHAKE_TIMEOUT / 1000}s`;
        setTimeout(() => {
          this.getElement().style.animation = '';
        }, config.SHAKE_TIMEOUT);
      });
  }

}

export default FilmComment;
