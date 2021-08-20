import utils from '../utils';

class FilmsStatisticsView {
  constructor(stat) {
    this._stat = stat;
    this._element = null;
  }

  getTemplate() {
    return `
      <p>${this._stat.allFilms} movies inside</p>
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

export default FilmsStatisticsView;
