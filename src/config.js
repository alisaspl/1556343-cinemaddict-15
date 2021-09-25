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
  PUT: 'PUT',
  DELETE: 'DELETE',
};
const HTTP_RESPONSE_STATUS = {
  OK: 200,
  AUTORIZATION_ERROR: 401,
};

const MENU_DESCRIPTION = [
  {
    type: 'allMovies',
    emptyText: 'There are no movies in our database',
    selected: true,
  },
  {
    type: 'isInWatchList',
    emptyText: 'There are no movies to watch now',
  },
  {
    type: 'isWatched',
    emptyText: 'There are no watched movies now',
  },
  {
    type: 'isFavorite',
    emptyText: 'There are no favorite movies now',
  },
  {
    type: 'stats',
    emptyText: 'No stat sorry',
  },
];

const USER_AVATAR = 'images/bitmap.png';

const LOADING_TEXT = 'Loading...';

const SHAKE_TIMEOUT = 600;

const STORAGE_NAME = 'cinemaddict-v10';
const FILMS_STORE_KEY = 'films';
const COMMENTS_STORE_KEY = 'comments';

const MAX_FILM_DESCRIPTION_LENGTH = 140;

const NEW_COMMENT_IMG = {
  WIDTH: 50,
  HEIGHT: 50,
};

const EXTRA_FILMS_QUANTITY = 2;
const EXTRA_FILM_CARD_TYPE = {
  TOP_RATED: 'top_rated',
  MOST_COMMENTED: 'most_commented',
};

const OFFLINE_MESSAGE = ' [offline]';

export default {
  FILMS_IN_LINE, STAT_BAR_HEIGHT, STAT_CHART_OPTIONS,
  USER_RANK_VALUES, API_URL, API_AUTHORIZATION,
  HTTP_METHODS, HTTP_RESPONSE_STATUS, MENU_DESCRIPTION, USER_AVATAR, LOADING_TEXT,
  SHAKE_TIMEOUT, STORAGE_NAME, FILMS_STORE_KEY, COMMENTS_STORE_KEY,
  MAX_FILM_DESCRIPTION_LENGTH, NEW_COMMENT_IMG, EXTRA_FILMS_QUANTITY,
  EXTRA_FILM_CARD_TYPE, OFFLINE_MESSAGE,
};
