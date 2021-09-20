import config from './config';

import FilmModel from './model/films'

class Api {
  constructor() {
    this._url = config.API_URL;
    this._authorization = config.API_AUTHORIZATION;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ${this._authorization}`);
    this._options = {
      headers
    };

  }

  getMovies() {
    this._load('movies')
      .then((data) => {
        const films = data.map((film) => FilmModel.adaptToClient(film));
        console.log(films);
      });
  }

  _load(url, method = 'GET', data = '') {
    if(!url) {
      throw new Error('no url specified');
    }
    if(url.startsWith('/')){
      url = url.substring(1);
    }
    url = `${this._url}/${url}`;

    const options = Object.assign({}, this._options);
    options.method = method;
    if(method !== config.HTTP_METHODS.GET){
      options.body = data;
    }

    return fetch(url, options)
      .then((response) => {
        if(response.status === 200) {
          let jsonData;
          try {
            jsonData = response.json();
          } catch(error) {
            throw error;
          }
          return jsonData;
        }
        if(response.status === 401) {
          throw new Error('authorization error');
        }
        throw new Error('request error');
      })
      .catch((error) => { throw error; });
  }
}

export default Api;
