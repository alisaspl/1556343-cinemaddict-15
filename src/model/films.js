import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import AbstractObserver from '../utils/abstract-observer.js';

class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = null;
  }

  getFilms(filter) {
    switch(filter) {
      case 'isInWatchList':
        return this._films.filter((element) => !!element.isInWatchList);
      case 'isWatched':
        return this._films.filter((element) => !!element.isWatched);
      case 'isFavorite':
        return this._films.filter((element) => !!element.isFavorite);
    }

    return this._films;
  }

  setFilms(films) {
    this._films = films;

    // FIXME remove
    for(const film of this._films) {
      film.release = Object.assign({}, film.release);
      film.release.date = dayjs(film.release.date, 'DD-MM-YYYY').format('DD MMMM YYYY');
    }
  }

  updateFilm(filmId, property, value) {
    for(const film of this._films) {
      if(film.id === filmId) {
        film[property] = value;
        break;
      }
    }
    this._notify(Films.CHANGE_EVENT, { filmId, property, value });
  }

  static adaptToClient(data) {
    const film = {
      id: data.id,
      title: data.film_info.alternative_title,
      originalTitle: data.film_info.title,
      poster: data.film_info.poster,
      description: data.film_info.description,
      comments: data.comments,
      genres: data.film_info.genre,
      director: data.film_info.director,
      actors: data.film_info.actors,
      writers: data.film_info.writers,
      release: data.film_info.release,
      totalRating: data.film_info.total_rating,
      runtime: data.film_info.runtime,
      ageRating: data.film_info.age_rating,
      isWatched: data.user_details.already_watched,
      isInWatchList: data.user_details.watchlist,
      isFavorite: data.user_details.favorite,
      watchingDate: dayjs.unix(data.user_details.watching_date),
    };
    film.release.date = dayjs(film.release.date, 'YYYY-MM-DD').format('DD MMMM YYYY');
    return film;
  }

  static adaptToServer(film) {
    const data = {};
    return data;
  }

}

Films.CHANGE_EVENT = Symbol('single film change event');

export default Films;
