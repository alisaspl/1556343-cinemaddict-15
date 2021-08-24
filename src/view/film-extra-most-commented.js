import utils from '../utils/common';
import utilsRender from '../utils/render';
import AbstractView from './abstract';

import FilmCardView from './film-card';

class FilmExtraMostCommentedView extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
    this._prepareData();
  }

  _prepareData() {
    this._films = utils.sortBy(this._films, (film) => film.comments.length).slice(0,2);
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
      super.getElement();
      const container = this._element.querySelector('.films-list__container');
      for(const film of this._films) {
        utilsRender.renderView(container, new FilmCardView(film));
      }
    }
    return this._element;
  }
}

export default FilmExtraMostCommentedView;
