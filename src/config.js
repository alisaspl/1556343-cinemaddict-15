const FILMS_IN_LINE = 5;
const STAT_BAR_HEIGHT = 50;

const STAT_CHART_OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 20,
      },
      color: '#ffffff',
      anchor: 'start',
      align: 'start',
      offset: 40,
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: '#ffffff',
        padding: 100,
        fontSize: 20,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
      barThickness: 24,
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

const USER_RANK_VALUES = [
  {value: 'novice', min: 1, max: 10},
  {value: 'fan', min: 11, max: 20},
  {value: 'movie buff', min: 21, max: Infinity},
];

const API_URL = 'https://15.ecmascript.pages.academy/cinemaddict';
const API_AUTHORIZATION = (Math.random() + 1).toString(36).substring(2);
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default { FILMS_IN_LINE, STAT_BAR_HEIGHT, STAT_CHART_OPTIONS, USER_RANK_VALUES, API_URL, API_AUTHORIZATION, HTTP_METHODS };
