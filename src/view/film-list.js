import { createElement, renderElement, RenderPosition } from '../utils';
import { FilmCardView } from './film-card';

class FilmsListView {
  constructor(films) {
    this._films = films;
    this._element = null;
    this._showMoreButton = null;
    this._lastFilmIndex = 0;
    this._showMoreButtonClickCallback = null;
  }

  getTemplate() {
    return `
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
        <button class="films-list__show-more">Show more</button>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = createElement(this.getTemplate());
      this._showMoreButton = this._element.querySelector('.films-list__show-more');

      this._showMoreButtonClickCallback = this.onShowMoreButtonClick.bind(this);
      this._showMoreButton.addEventListener('click', this._showMoreButtonClickCallback);

      const container = this._element.querySelector('.films-list__container');
      for(; this._lastFilmIndex < 5; this._lastFilmIndex++) {
        renderElement(
          container,
          new FilmCardView(this._films[this._lastFilmIndex]).getElement(),
          RenderPosition.BEFOREEND,
        );
      }
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
    this._showMoreButton.removeEventListener('click', this._showMoreButtonClickCallback);
    this._showMoreButton = null;
    this._showMoreButtonClickCallback = null;
    this._lastFilmIndex = 0;
  }

  onShowMoreButtonClick() {
    const newLastIndex = this._lastFilmIndex + 5;
    const container = this._element.querySelector('.films-list__container');

    for(; this._lastFilmIndex < newLastIndex; this._lastFilmIndex++){
      if(this._lastFilmIndex === this._films.length){
        break;
      }
      renderElement(
        container,
        new FilmCardView(this._films[this._lastFilmIndex]).getElement(),
        RenderPosition.BEFOREEND,
      );
    }

    if(this._lastFilmIndex === this._films.length){
      this._showMoreButton.classList.add('visually-hidden');
    }
  }

}

export { FilmsListView };
