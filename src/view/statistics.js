export const createStatisticsTemplate = (statistics, user) => `
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="${user.avatar}" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${user.rank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
      value="all-time" ${statistics.selectedMenu ===  'allTime' ? 'checked' : ''}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
      value="today" ${statistics.selectedMenu ===  'today' ? 'checked' : ''}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
      value="week" ${statistics.selectedMenu ===  'week' ? 'checked' : ''}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
      value="month" ${statistics.selectedMenu ===  'month' ? 'checked' : ''}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
      value="year" ${statistics.selectedMenu ===  'year' ? 'checked' : ''}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${statistics.watchedFilms}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${statistics.runtime.hours} <span class="statistic__item-description">h</span> ${statistics.runtime.minutes} <span
          class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${statistics.genre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
`;
