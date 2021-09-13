import Abstract from './abstract';

class Smart extends Abstract {

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: ${this.restoreHandlers.name}`);
  }

  updateElement() {
    let container;
    if(this._element !== null) {
      container = this._element.parentElement;
      this.removeElement();
    }
    container.appendChild(this.getElement());
    this.restoreHandlers();
  }

  updateData() {
    this.updateElement();
  }

}

export default Smart;
