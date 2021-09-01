import AbstractView from './abstract';

class StatisticsView extends AbstractView {
  constructor(user, userFilmsStat, menu) {
    super();
    this._user = user;
    this._userFilmsStat = userFilmsStat;
    this._menu = menu;
  }

  getTemplate() {
    return `
      <section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="${this._user.avatar}" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._user.rank}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
            value="all-time" ${this._menu === 'allTime' ? 'checked' : ''}>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
            value="today" ${this._menu === 'today' ? 'checked' : ''}>
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
            value="week" ${this._menu === 'week' ? 'checked' : ''}>
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
            value="month" ${this._menu === 'month' ? 'checked' : ''}>
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
            value="year" ${this._menu === 'year' ? 'checked' : ''}>
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._userFilmsStat.watched}<span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._userFilmsStat.runtime.hours} <span class="statistic__item-description">h</span> ${this._userFilmsStat.runtime.minutes} <span
                class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._userFilmsStat.topGenre}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>
    `;
  }
}

export default StatisticsView;
