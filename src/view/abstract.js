import utilsRender from '../utils/render';

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract class - ${new.target}, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }

  getElement() {
    if(this._element === null) {
      this._element = utilsRender.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if(this._element !== null) {
      this._element.remove();
      this._element = null;
    }
  }

  static removeView(view) {
    if(view !== null) {
      view.removeElement();
      view = null;
    }
  }
}

export default Abstract;
