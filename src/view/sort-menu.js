import AbstractView from './abstract';

class SortMenuView extends AbstractView {
  constructor(menu) {
    super();
    this._menu = menu;
    this._callback = null;
    this._clickHandler = this._clickHandler.bind(this);
  }

  addListener(callback) {
    this._callback = callback;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if(this._menu.selected !== evt.target.dataset.type) {
      this._menu.selected = evt.target.dataset.type;
      this._callback(this._menu.selected);
    }
  }

  getTemplate() {
    return  `
      <section class="sort-menu-container">
        <ul class="sort">
          <li><a href="#" data-type="default" class="sort__button ${this._menu.selected === 'default' ? 'sort__button--active' : ''}">Sort by default</a></li>
          <li><a href="#" data-type="date" class="sort__button ${this._menu.selected === 'date' ? 'sort__button--active' : ''}">Sort by date</a></li>
          <li><a href="#" data-type="rating" class="sort__button ${this._menu.selected === 'rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
        </ul>
      </section>
    `;
  }

  getElement() {
    if(this._element === null) {
      super.getElement();
      this._element.querySelectorAll('a').forEach((element) => element.addEventListener('click', this._clickHandler));
    }
    return this._element;
  }

  removeElement() {
    this._element.querySelectorAll('a').forEach((element) => element.removeEventListener('click', this._clickHandler));
    super.removeElement();
  }
}

export default SortMenuView;
