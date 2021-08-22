import utils from '../utils';

class EmptyView {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return `
      <h2 class="films-list__title">
        ${this._menu.emptyText}
      </h2>
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

export default EmptyView;
