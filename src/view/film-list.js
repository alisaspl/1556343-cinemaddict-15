import utils from '../utils';
import FilmCardView from './film-card';
import FilmExtraTopRatedView from './film-extra-top-rated';
import FilmExtraMostCommentedView from './film-extra-most-commented';

class FilmsListView {
  constructor(films, menu) {
    this._films = films;
    this._menu = menu;
    this._element = null;
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

  getEmptyTemplate(){
    return `
      <h2 class="films-list__title">
        ${this._menu.emptyText}
      </h2>
    `;
  }

  getElement() {
    if(this._element === null) {
      if(!this._films || this._films.length === 0) {
        this._element = utils.createElement(this.getEmptyTemplate());
      } else {

        this._element = utils.createElement(this.getTemplate());
        this._showMoreButton = this._element.querySelector('.films-list__show-more');

        this._showMoreButtonClickCallback = this.onShowMoreButtonClick.bind(this);
        this._showMoreButton.addEventListener('click', this._showMoreButtonClickCallback);

        const container = this._element.querySelector('.films-list__container');
        for(; this._lastFilmIndex < 5; this._lastFilmIndex++) {
          utils.renderElement(container, new FilmCardView(this._films[this._lastFilmIndex]).getElement());
        }

        const filmExtraTopRatedView = new FilmExtraTopRatedView([this._films[0], this._films[1]]);
        const filmExtraMostCommentedView = new FilmExtraMostCommentedView([this._films[2], this._films[3]]);
        utils.renderElement(this._element, filmExtraTopRatedView.getElement());
        utils.renderElement(this._element, filmExtraMostCommentedView.getElement());
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
      utils.renderElement(container, new FilmCardView(this._films[this._lastFilmIndex]).getElement());

      if(this._lastFilmIndex === this._films.length - 1){
        this._showMoreButton.classList.add('visually-hidden');
        break;
      }
    }
  }
}

export default FilmsListView;
