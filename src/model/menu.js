class Menu {
  constructor() {
    this._menu = null;
  }

  getMenu() {
    return this._menu;
  }

  setMenu(menu) {
    this._menu = menu;
  }

  setSelected(type) {
    for(const menu of this._menu) {
      if(menu.type === type) {
        menu.selected = true;
      } else {
        menu.selected = false;
      }
    }
  }

  getSelected() {
    for(const menu of this._menu) {
      if(menu.selected) {
        return menu;
      }
    }
  }

}

export default Menu;
