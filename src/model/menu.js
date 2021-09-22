import AbstractObserver from '../utils/abstract-observer';

import config from '../config';

class Menu extends AbstractObserver {
  constructor() {
    super();
    this._menu = config.MENU_DESCRIPTION;
  }

  getMenu() {
    return this._menu;
  }

  setSelected(type) {
    for(const menu of this._menu) {
      if(menu.type === type) {
        menu.selected = true;
      } else {
        menu.selected = false;
      }
    }
    this._notify(Menu.CHANGE_EVENT, this.getSelected());
  }

  getSelected() {
    for(const menu of this._menu) {
      if(menu.selected) {
        return menu;
      }
    }
  }
}

Menu.CHANGE_EVENT = Symbol('change selected menu');

export default Menu;
