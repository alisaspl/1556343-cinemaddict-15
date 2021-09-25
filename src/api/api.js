import config from '../config';

import FilmModel from '../model/films';

class Api {
  constructor() {
    this._url = config.API_URL;
    this._authorization = config.API_AUTHORIZATION;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ${this._authorization}`);
    this._options = {
      headers,
    };

  }

  getFilms() {
    return this._load('movies').then(
      (data) => data.map((film) => FilmModel.adaptToClient(film)),
    );
  }

  updateFilm(film) {
    return this._load(`movies/${film.id}`, config.HTTP_METHODS.PUT, JSON.stringify(FilmModel.adaptToServer(film)))
      .then((filmFromServer) => FilmModel.adaptToClient(filmFromServer));
  }

  getComments(filmId) {
    return this._load(`comments/${filmId}`);
  }

  addComment(filmId, comment) {
    return this._load(`comments/${filmId}`, config.HTTP_METHODS.POST, JSON.stringify(comment));
  }

  removeComment(commentId) {
    return this._load(`comments/${commentId}`, config.HTTP_METHODS.DELETE);
  }

  sync(films) {
    return this._load('/movies/sync', config.HTTP_METHODS.POST, JSON.stringify(films));
  }

  _load(url, method = config.HTTP_METHODS.GET, data = '') {
    if(!url) {
      throw new Error('no url specified');
    }
    if(url.startsWith('/')) {
      url = url.substring(1);
    }
    url = `${this._url}/${url}`;

    const options = Object.assign({}, this._options);
    options.method = method;
    if(method !== config.HTTP_METHODS.GET) {
      options.body = data;
    }

    return fetch(url, options)
      .then((response) => {
        if(response.status === config.HTTP_RESPONSE_STATUS.OK) {
          const type = response.headers.get('Content-Type');
          if(type.startsWith('application/json')) {
            return response.json();
          } else if(type.startsWith('text/plain')) {
            return {
              status: response.body,
            };
          }
          throw new Error('unknown response body type');
        }
        if(response.status === config.HTTP_RESPONSE_STATUS.AUTORIZATION_ERROR) {
          throw new Error('authorization error');
        }
        throw new Error('request error');
      })
      .catch((error) => { throw error; });
  }
}

export default Api;
