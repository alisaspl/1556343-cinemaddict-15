import AbstractView from './abstract';

class SortMenuView extends AbstractView {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return  `
      <section class="sort-menu-container">
        <ul class="sort">
          <li><a href="#" class="sort__button ${this._menu.selected === 'default' ? 'sort__button--active' : ''}">Sort by default</a></li>
          <li><a href="#" class="sort__button ${this._menu.selected === 'date' ? 'sort__button--active' : ''}">Sort by date</a></li>
          <li><a href="#" class="sort__button ${this._menu.selected === 'rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
        </ul>
      </section>
    `;
  }
}

export default SortMenuView;
