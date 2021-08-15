import { createElement, renderElement, RenderPosition } from '../utils';

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
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

//export const createFilmCommentsTemplate = (comments) => `
class FilmCommentsView {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list"></ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = createElement(this.getTemplate());
      const container = this._element.querySelector('.film-details__comments-list');
      for(const comment of this._comments) {
        renderElement(container, new FilmCommentView(comment).getElement(), RenderPosition.BEFOREEND);
      }
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export { FilmCommentsView };
