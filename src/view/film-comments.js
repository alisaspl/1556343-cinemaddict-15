import AbstractView from './abstract';

class FilmComments extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
    this._onEmojiClick = this._onEmojiClick.bind(this);
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
    super.getElement();

    this._emojies = this._element.querySelectorAll('.film-details__emoji-item');
    for(const emoji of this._emojies) {
      emoji.addEventListener('click', this._onEmojiClick);
    }
    this._emojiAddContainer = this._element.querySelector('.film-details__add-emoji-label');

    return this._element;
  }

  removeElement() {
    for(const emoji of this._emojies) {
      emoji.removeEventListener('click', this._onEmojiClick);
    }
    super.removeElement();
  }

  addComment() {
    const commentText = this.getElement().querySelector('.film-details__comment-input').value;
    const commentEmojiElement = this.getElement().querySelector('.film-details__comment-input-img');

    if(commentText.trim() === '' || !commentEmojiElement) {
      return;
    }

    return {
      text: commentText,
      name: commentEmojiElement.value,
      src: commentEmojiElement.src.replace(/^https?:\/\/[a-zA-Z0-9._]+(:\d+)?/, ''),
    };
  }

  _onEmojiClick(evt) {
    evt.currentTarget.checked = 'checked';

    const imgElement = this._element.querySelector(`label[for=${evt.currentTarget.id}]`).querySelector('img');
    const newImgElement = document.createElement('img');
    newImgElement.width = 50;
    newImgElement.height = 50;
    newImgElement.src = imgElement.src;
    newImgElement.alt = imgElement.alt;
    newImgElement.classList.add('film-details__comment-input-img');
    newImgElement.value = evt.currentTarget.value;

    if(this._emojiAddContainer.lastChild) {
      this._emojiAddContainer.removeChild(this._emojiAddContainer.lastChild);
    }
    this._emojiAddContainer.appendChild(newImgElement);
  }

}

export default FilmComments;
