import AbstractView from './abstract';

class FilmsStatisticsView extends AbstractView {
  constructor(stat) {
    super();
    this._stat = stat;
  }

  getTemplate() {
    return `
      <p>${this._stat.allFilms} movies inside</p>
    `;
  }
}

export default FilmsStatisticsView;
