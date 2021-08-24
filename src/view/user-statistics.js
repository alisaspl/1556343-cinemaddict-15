import AbstractView from './abstract';

class UserStatisticsView extends AbstractView {
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

export default UserStatisticsView;
