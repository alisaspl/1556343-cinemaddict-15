import utilsRender from '../utils/render';
import config from '../config.js';
import AbstractView from './abstract';

import FilmCardView from './film-card';
import FilmExtraTopRatedView from './film-extra-top-rated';
import FilmExtraMostCommentedView from './film-extra-most-commented';

class FilmsListView extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
    this._showMoreButton = null;
    this._lastFilmIndex = 0;
    this._showMoreButtonClickCallback = null;
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container"></div>
          <button class="films-list__show-more">Show more</button>
        </section>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      super.getElement();
      this._showMoreButton = this._element.querySelector('.films-list__show-more');

      this._showMoreButtonClickCallback = this._onShowMoreButtonClick.bind(this);
      this._showMoreButton.addEventListener('click', this._showMoreButtonClickCallback);

      this._renderNextElements();

      utilsRender.renderView(this._element, new FilmExtraTopRatedView(this._films));
      utilsRender.renderView(this._element, new FilmExtraMostCommentedView(this._films));
    }
    return this._element;
  }

  removeElement() {
    super.removeElement();
    this._showMoreButton.removeEventListener('click', this._showMoreButtonClickCallback);
    this._showMoreButton = null;
    this._showMoreButtonClickCallback = null;
    this._lastFilmIndex = 0;
  }

  _renderNextElements() {
    const newLastIndex = this._lastFilmIndex + config.FILMS_IN_LINE;
    const container = this._element.querySelector('.films-list__container');

    for(; this._lastFilmIndex < newLastIndex; this._lastFilmIndex++){
      utilsRender.renderView(container, new FilmCardView(this._films[this._lastFilmIndex]));

      if(this._lastFilmIndex === this._films.length - 1){
        this._showMoreButton.classList.add('visually-hidden');
        break;
      }
    }
  }

  _onShowMoreButtonClick(event) {
    event.preventDefault();
    this._renderNextElements();
  }
}

export default FilmsListView;
