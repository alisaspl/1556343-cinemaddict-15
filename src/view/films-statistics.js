import AbstractView from './abstract';

class FilmsStatistics extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return `
      <p>${this._filmsCount} movies inside</p>
    `;
  }
}

export default FilmsStatistics;
