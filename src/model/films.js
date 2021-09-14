import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

class Films {
  constructor() {
    this._films = null;
  }

  getFilms(filter) {
    switch(filter) {
      case 'watchlist':
        return this._films.filter((element) => !!element.isInWatchList);
      case 'history':
        return this._films.filter((element) => !!element.isWatched);
      case 'favorites':
        return this._films.filter((element) => !!element.isFavorite);
    }

    return this._films;
  }

  setFilms(films) {
    this._films = films;
    for(const film of this._films) {
      film.release = Object.assign({}, film.release);
      film.release.date = dayjs(film.release.date, 'DD-MM-YYYY').format('DD MMMM YYYY');
    }
  }

  updateFilm() {}
}

export default Films;
