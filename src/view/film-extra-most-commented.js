import utils from '../utils';
import FilmCardView from './film-card';

class FilmExtraMostCommentedView {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="films-list films-list--extra films-list-top-rated">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = utils.createElement(this.getTemplate());
      const container = this._element.querySelector('.films-list__container');
      for(const film of this._films) {
        utils.renderElement(
          container,
          new FilmCardView(film).getElement(),
        );
      }
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmExtraMostCommentedView;
