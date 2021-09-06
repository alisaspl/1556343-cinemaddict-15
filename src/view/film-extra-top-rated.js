import AbstractView from './abstract';

class FilmExtraTopRated extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films-list films-list--extra films-list-most-commented">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>
    `;
  }
}

export default FilmExtraTopRated;
