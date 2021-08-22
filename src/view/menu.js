import AbstractView from '../view';

class MenuView extends AbstractView {
  constructor(menu, stat) {
    super();
    this._menu = menu;
    this._stat = stat;
  }

  getTemplate() {
    return `
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${this._menu.type === 'allMovies' ? 'main-navigation__item--active' : ''}">All movies</a>
          <a href="#watchlist" class="main-navigation__item ${this._menu.type === 'watchlist' ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count" >${this._stat.watchlist}</span></a>
          <a href="#history" class="main-navigation__item ${this._menu.type === 'history' ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count" >${this._stat.watched}</span></a>
          <a href="#favorites" class="main-navigation__item ${this._menu.type === 'favorites' ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${this._stat.favorites}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional ${this._menu.type === 'stats' ? 'main-navigation__item--active' : ''}">Stats</a>
      </nav>
    `;
  }
}

export default MenuView;
