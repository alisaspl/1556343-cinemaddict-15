import utils from '../utils';

class SortMenuView {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return  `
      <ul class="sort">
        <li><a href="#" class="sort__button ${this._menu.selected === 'default' ? 'sort__button--active' : ''}">Sort by default</a></li>
        <li><a href="#" class="sort__button ${this._menu.selected === 'date' ? 'sort__button--active' : ''}">Sort by date</a></li>
        <li><a href="#" class="sort__button ${this._menu.selected === 'rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
      </ul>
    `;
  }

  getElement() {
    if(this._element === null) {
      this._element = utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default SortMenuView;
