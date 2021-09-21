import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import AbstractObserver from '../utils/abstract-observer.js';

class Films extends AbstractObserver {
  constructor(api) {
    super();
    this._api = api;
    Films._films = [];
  }

  getFilms(filter) {
    switch(filter) {
      case 'isInWatchList':
        return Films._films.filter((element) => !!element.isInWatchList);
      case 'isWatched':
        return Films._films.filter((element) => !!element.isWatched);
      case 'isFavorite':
        return Films._films.filter((element) => !!element.isFavorite);
    }

    return Films._films;
  }

  static getFullFilm(id) {
    return Films._films.find((film) => film.id === id);
  }

  setFilms(films) {
    Films._films = films;
    this._notify(Films.INIT_EVENT, {});
  }

  updateFilm(filmId, property, value) {
    for(const film of Films._films) {
      if(film.id === filmId) {
        film[property] = value;
        return this._api.updateFilm(film)
          .then(() => {
            this._notify(Films.CHANGE_EVENT, { filmId, property, value });
          });
      }
    }
  }

  static adaptToClient(data) {
    return {
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
      release: {
        date: data.film_info.release.date,
        releaseCountry: data.film_info.release.release_country,
      },
      totalRating: data.film_info.total_rating,
      runtime: data.film_info.runtime,
      ageRating: data.film_info.age_rating,
      isWatched: data.user_details.already_watched,
      isInWatchList: data.user_details.watchlist,
      isFavorite: data.user_details.favorite,
      watchingDate: data.user_details.watching_date,
    };
  }

  static adaptToServer(film) {
    return {
      id: film.id,
      'film_info': {
        title: film.originalTitle,
        'alternative_title': film.title,
        'total_rating': film.totalRating,
        poster: film.poster,
        'age_rating': film.ageRating,
        director: film.director,
        writers: film.writers,
        actors: film.actors,
        release: {
          date: film.release.date,
          'release_country': film.release.releaseCountry,
        },
        runtime: film.runtime,
        genre: film.genres,
        description: film.description,
      },
      'user_details': {
        watchlist: film.isInWatchList,
        'already_watched': film.isWatched,
        'watching_date': film.watchingDate,
        favorite: film.isFavorite,
      },
      comments: film.comments,
    };
  }

}

// Films._films = [];
Films.CHANGE_EVENT = Symbol('single film change event');
Films.INIT_EVENT = Symbol('fires after films are loaded');

export default Films;
