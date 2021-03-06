import AbstractView from './abstract';

class Empty extends AbstractView {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return `
      <h2 class="films-list__title">
        ${this._menu.emptyText}
      </h2>
    `;
  }
}

export default Empty;
