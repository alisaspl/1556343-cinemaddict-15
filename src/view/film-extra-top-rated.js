import { createElement, renderElement, RenderPosition } from '../utils';
import { FilmCardView } from './film-card';

class FilmExtraTopRatedView {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="films-list films-list--extra films-list-most-commented">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = createElement(this.getTemplate());
      const container = this._element.querySelector('.films-list__container');
      for(const film of this._films){
        renderElement(
          container,
          new FilmCardView(film).getElement(),
          RenderPosition.BEFOREEND,
        );
      }
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export { FilmExtraTopRatedView };
