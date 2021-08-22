import utils from '../utils/common';
import utilsRender from '../utils/render';
import AbstractView from '../view';

import FilmCardView from './film-card';

class FilmExtraTopRatedView extends AbstractView {
  constructor(films) {
    super();
    this._films = utils.sortBy(films, (film) => film.totalRating).slice(0,2);
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
      super.getElement();
      const container = this._element.querySelector('.films-list__container');
      for(const film of this._films){
        utilsRender.renderView(container, new FilmCardView(film));
      }
    }
    return this._element;
  }
}

export default FilmExtraTopRatedView;
