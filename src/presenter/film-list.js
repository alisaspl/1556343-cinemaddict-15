import config from '../config';
import utils from '../utils/common';
import utilsRender from '../utils/render';

import FilmPresenter from './film';

import FilmListView from '../view/film-list';
import SortMenuView from '../view/sort-menu';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';
import ShowMoreButtonView from '../view/show-more-button';

import { sortMenuData } from '../mocks';

class FilmList {
  constructor(container, rerenderMenuCallback) {
    this._container = container;
    this._rerenderMenuCallback = rerenderMenuCallback;

    this._data = {
      films: null,
      filmsCopy: null,
      sortMenu: null,
    };

    this._view = {
      sortMenu: null,
      filmList: null,
      filmCard: null,
      topRated: null,
      mostCommented: null,
      showMoreButton: null,
    };

    this._filmPresenters = new Map();

    this._lastFilmIndex = 0;
  }

  init(films){
    this._data = {
      films,
      filmsCopy: [...films],
      sortMenu: sortMenuData,
    };

    this._data.sortMenu.selected = 'default';

    this._rerenderFilms();
  }

  remove() {
    this._lastFilmIndex = 0;
    for(const key in this._view) {
      if(this._view[key] !== null) {
        this._view[key].removeElement();
      }
    }
  }

  _rerenderFilms() {
    this.remove();

    this._data.filmsCopy = [...this._data.films];

    this._renderSortMenu();
    this._renderFilmList();
    this._renderShowMoreButton();
    this._renderNextElements();
    this._renderTopRated();
    this._renderMostCommented();
  }

  _onFilmPropertyChange(film, property, value) {
    for(const key of this._filmPresenters.keys()) {
      const presenter = this._filmPresenters.get(key);
      if(key.id === film.id) {
        presenter.filmCard[property] = value;
        if(presenter.filmCardDetails !== null) {
          presenter.filmCardDetails[property] = value;
        }
      }
    }
    this._rerenderMenuCallback();
  }

  _onFilmCommentsChange(film, value) {
    this._view.mostCommented.removeElement();
    this._renderMostCommented();
    for(const key of this._filmPresenters.keys()) {
      const presenter = this._filmPresenters.get(key);
      if(key.id === film.id) {
        presenter.filmCard.changeCommentsLength(value);
      }
    }
  }

  _renderFilmCard(film, view) {
    this._filmPresenters.set(
      {id: film.id, view},
      new FilmPresenter(
        view.getElement().querySelector('.films-list__container'),
        film,
        this._onFilmPropertyChange.bind(this, film, 'isInWatchList'),
        this._onFilmPropertyChange.bind(this, film, 'isWatched'),
        this._onFilmPropertyChange.bind(this, film, 'isFavorite'),
        this._onFilmCommentsChange.bind(this, film),
      ),
    );
  }

  _renderSortMenu() {
    this._view.sortMenu = new SortMenuView(this._data.sortMenu);
    if(this._data.sortMenu.selected === 'default') {
      this._data.filmsCopy = utils.sortBy(this._data.filmsCopy,
        (film) => film.id,
      );
    } else if(this._data.sortMenu.selected === 'rating') {
      this._data.filmsCopy = utils.sortBy(this._data.filmsCopy,
        (film) => parseFloat(film.totalRating),
      );
    } else if(this._data.sortMenu.selected === 'date') {
      this._data.filmsCopy = utils.sortBy(this._data.filmsCopy,
        (film) => {
          const date = new Date(film.release.date);
          return date.getTime();
        },
      );
    }
    this._view.sortMenu.addListener((menuType) => {
      this._data.sortMenu.selected = menuType;
      if(menuType === 'default') {
        this._data.films = utils.sortBy(this._data.films,
          (film) => film.id,
        );
      } else if(menuType === 'rating') {
        this._data.films = utils.sortBy(this._data.films,
          (film) => parseFloat(film.totalRating),
        );
      } else if(menuType === 'date') {
        this._data.films = utils.sortBy(this._data.films,
          (film) => {
            const date = new Date(film.release.date);
            return date.getTime();
          },
        );
      }
      this._rerenderFilms();
    });
    utilsRender.renderView(this._container, this._view.sortMenu);
  }

  _renderFilmList() {
    this._view.filmList = new FilmListView();
    utilsRender.renderView(this._container, this._view.filmList);
  }

  _renderTopRated() {
    const films = utils.sortBy(this._data.films,
      (film) => parseFloat(film.totalRating),
    ).slice(0,2);
    this._view.topRated = new FilmExtraTopRatedView();
    for(const film of films){
      this._renderFilmCard(film, this._view.topRated);
    }
    utilsRender.renderView(this._view.filmList.getElement(), this._view.topRated);
  }

  _renderMostCommented() {
    const films = utils.sortBy(this._data.films,
      (film) => film.comments.length,
    ).slice(0,2);
    this._view.mostCommented = new FilmExtraMostCommentedView();
    for(const film of films) {
      this._renderFilmCard(film, this._view.mostCommented);
    }
    utilsRender.renderView(this._view.filmList.getElement(), this._view.mostCommented);
  }

  _renderShowMoreButton() {
    this._view.showMoreButton = new ShowMoreButtonView(this._renderNextElements.bind(this));
    utilsRender.renderView(
      this._view.filmList.getElement().querySelector('.films-list'),
      this._view.showMoreButton,
    );
  }

  _renderNextElements() {
    const newLastIndex = this._lastFilmIndex + config.FILMS_IN_LINE;

    for(; this._lastFilmIndex < newLastIndex; this._lastFilmIndex++){
      this._renderFilmCard(this._data.filmsCopy[this._lastFilmIndex], this._view.filmList);

      if(this._lastFilmIndex === this._data.filmsCopy.length - 1){
        this._view.showMoreButton.removeElement();
        break;
      }
    }
  }
}

export default FilmList;
