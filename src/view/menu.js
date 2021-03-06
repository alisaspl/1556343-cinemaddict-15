import AbstractView from './abstract';

class Menu extends AbstractView {
  constructor(menu, stat) {
    super();
    this._menu = menu;
    this._stat = stat;
    this._callback = null;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if(!this.getElement().classList.contains('main-navigation__item--active')) {
      this._callback(evt.currentTarget.dataset.type);
    }
  }

  addListener(callback) {
    this._callback = callback;
  }

  getTemplate() {
    return `
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" data-type="allMovies" class="main-navigation__item ${this._menu.type === 'allMovies' ? 'main-navigation__item--active' : ''}">All movies</a>
          <a href="#watchlist" data-type="isInWatchList" class="main-navigation__item ${this._menu.type === 'isInWatchList' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count" >${this._stat.watchlist}</span></a>
          <a href="#history" data-type="isWatched" class="main-navigation__item ${this._menu.type === 'isWatched' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count" >${this._stat.watched}</span></a>
          <a href="#favorites" data-type="isFavorite" class="main-navigation__item ${this._menu.type === 'isFavorite' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${this._stat.favorites}</span></a>
        </div>
        <a href="#stats" data-type="stats" class="main-navigation__additional ${this._menu.type === 'stats' ? 'main-navigation__item--active' : ''}">Stats</a>
      </nav>
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
    if(this._element !== null) {
      this._element.querySelectorAll('a').forEach((element) => element.removeEventListener('click', this._clickHandler));
      super.removeElement();
    }
  }
}

export default Menu;
