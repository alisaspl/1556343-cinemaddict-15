import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import AbstractView from './abstract';
import config from '../config';

class Statistics extends AbstractView {
  constructor(user, userFilmsStat, menu, onFilterChangeCallback) {
    super();
    this._user = user;
    this._userFilmsStat = userFilmsStat;
    this._menu = menu;
    this._timeFormatRe = /([hm])/g;

    this._filters = null;
    this._onMenuChange = this._onMenuChange.bind(this);

    this._onFilterChangeCallback = onFilterChangeCallback;
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
            value="all-time" ${this._menu === 'all-time' ? 'checked' : ''}>
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
            <p class="statistic__item-text">${this._userFilmsStat.runtime.replace(this._timeFormatRe, '<span class="statistic__item-description">$1</span>')}</p>
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

  getElement() {
    super.getElement();

    if(this._user.rank === 0) {
      this._element.querySelector('.statistic__rank').remove();
    }

    const statisticCtx = this._element.querySelector('.statistic__chart');
    statisticCtx.height = config.STAT_BAR_HEIGHT * 5;

    new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: this._userFilmsStat.sortedGenresStatistics.map((element) => element.key),
        datasets: [{
          data: this._userFilmsStat.sortedGenresStatistics.map((element) => element.value),
          backgroundColor: '#ffe800',
          hoverBackgroundColor: '#ffe800',
          anchor: 'start',
        }],
      },
      options: config.STAT_CHART_OPTIONS,
    });

    this._filters = this._element.querySelectorAll('.statistic__filters-input');
    for(const filter of this._filters) {
      filter.addEventListener('change', this._onMenuChange);
    }

    return this._element;
  }

  removeElement() {
    if(this._element !== null) {
      for(const filter of this._filters) {
        filter.removeEventListener('change', this._onMenuChange);
      }
      super.removeElement();
    }
  }

  _onMenuChange(event) {
    if(event.currentTarget.checked) {
      this._onFilterChangeCallback(event.currentTarget.value);
    }
  }

}

export default Statistics;
