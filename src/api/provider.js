import utils from '../utils/common';
import config from '../config';

import FilmsModel from '../model/films';

const createStoreStructure = (items) =>
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});

class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this.needSync = false;
  }

  getFilms() {
    if(utils.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setStoreKey(config.FILMS_STORE_KEY);
          this._store.setItems(items);
          this.needSync = false;
          return films;
        });
    }

    this._store.setStoreKey(config.FILMS_STORE_KEY);
    const storedFilms = Object.values(this._store.getItems());
    return Promise.resolve(storedFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if(utils.isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setStoreKey(config.FILMS_STORE_KEY);
          this._store.setItem(updatedFilm.id, updatedFilm);
          return updatedFilm;
        });
    }

    const newFilm = FilmsModel.adaptToServer(Object.assign({}, film));
    this._store.setStoreKey(config.FILMS_STORE_KEY);
    this._store.setItem(film.id, newFilm);
    this.needSync = true;
    return Promise.resolve(newFilm);
  }

  getComments(filmId) {
    if(utils.isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          this._store.setStoreKey(config.COMMENTS_STORE_KEY);
          this._store.setItem(filmId, comments);
          return comments;
        });
    }

    this._store.setStoreKey(config.COMMENTS_STORE_KEY);
    const cachedComments = this._store.getItem(filmId);
    return Promise.resolve(!cachedComments || cachedComments.length === undefined ? [] : cachedComments);
  }

  addComment(filmId, comment) {
    if(utils.isOnline()) {
      return this._api.addComment(filmId, comment);
    }
    return Promise.reject(new Error('add comment failed'));
  }

  removeComment(commentId) {
    if(utils.isOnline()) {
      return this._api.removeComment(commentId);
    }
    return Promise.reject(new Error('remove comment failed'));
  }

  sync() {
    if(utils.isOnline() && this.needSync) {
      this._store.setStoreKey(config.FILMS_STORE_KEY);
      return this._api.sync(Object.values(this._store.getItems()))
        .then((response) => {
          this._store.setStoreKey(config.FILMS_STORE_KEY);
          this._store.setItems([...(response.created || []), ...(response.updated || [])]);
          this.needSync = false;
        });
    }
  }
}

export default Provider;
