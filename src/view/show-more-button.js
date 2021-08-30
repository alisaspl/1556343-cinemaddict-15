import AbstractView from './abstract';

class ShowMoreButtonView extends AbstractView {
  constructor(clickCallback) {
    super();
    this._onClick = this._onClick.bind(this);
    this._clickCallback = clickCallback;
  }

  getTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  getElement() {
    if(this._element === null) {
      super.getElement();
      this._element.addEventListener('click', this._onClick);
    }
    return this._element;
  }

  removeElement(){
    if(this._element !== null){
      this._element.removeEventListener('click', this._onClick);
      this._element.classList.add('visually-hidden');
      super.removeElement();
    }
  }

  _onClick(event) {
    event.preventDefault();
    this._clickCallback();
  }
}

export default ShowMoreButtonView;
