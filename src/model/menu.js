import AbstractObserver from '../utils/abstract-observer'

class Menu extends AbstractObserver {
  constructor() {
    super();
    this._menu = null;
  }

  getMenu() {
    return this._menu;
  }

  setMenu(menu) {
    this._menu = menu;
  }

  setSelected(type) {
    console.log(type, this.getSelected().type);
    if(type === this.getSelected().type){
      return;
    }
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

Menu.CHANGE_EVENT = Symbol('change selected menu')

export default Menu;
