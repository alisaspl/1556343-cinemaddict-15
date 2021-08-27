import AbstractView from './abstract';

class FilmExtraMostCommentedView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="films-list films-list--extra films-list-top-rated">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container"></div>
      </section>
    `;
  }
}

export default FilmExtraMostCommentedView;
