import config from '../config';
import utils from '../utils/common';
import utilsRender from '../utils/render';

import FilmPresenter from './film';

import FilmListView from '../view/film-list';
import SortMenuView from '../view/sort-menu';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';
import ShowMoreButtonView from '../view/show-more-button';

import FilmModel from '../model/films';
import { sortMenuData } from '../mocks';

class FilmList {
  constructor(container, filmModel, filter, rerenderMenuCallback) {
    this._container = container;
    this._rerenderMenuCallback = rerenderMenuCallback;

    this._onFilmDataChange = this._onFilmDataChange.bind(this);

    this._filter = filter;

    this._sortMenu = sortMenuData;
    this._sortMenu.selected = 'default';

    this._view = {
      sortMenu: null,
      filmList: null,
      filmCard: null,
      topRated: null,
      mostCommented: null,
      showMoreButton: null,
    };

    this._filmPresenters = new Map();

    this._filmModel = filmModel;
    this._filmModel.addObserver(this._onFilmDataChange);

    this._lastFilmIndex = 0;
    this._films = this._filmModel.getFilms(this._filter);
    this._rerenderFilms();
  }

  remove(final) {
    this._lastFilmIndex = 0;

    for(const key in this._view) {
      if(this._view[key] !== null) {
        this._view[key].removeElement();
      }
    }

    this._filmPresenters = new Map();

    if(final) {
      this._filmModel.removeObserver(this._onFilmDataChange);
    }
  }

  // FIXME name
  _onFilmPropertyChange(film, property, value) {
    this._filmModel.updateFilm(film.id, property, value);
  }

  _onFilmDataChange(event, payload) {
    if(event === FilmModel.CHANGE_EVENT) {
      const presenters = [];
      for(const key of this._filmPresenters.keys()) {
        const presenter = this._filmPresenters.get(key);
        if(key.id === payload.filmId) {
          presenters.push({ presenter, payload });
        }
      }

      for(const { presenter, payload } of presenters) {
        if(presenter.filmCard !== null) {
          presenter.filmCard[payload.property] = payload.value;
        }
        if(presenter.filmCardDetails !== null) {
          presenter.filmCardDetails[payload.property] = payload.value;
        }

        if(payload.property !== this._filter) {
          break;
        }

        this._films = this._filmModel.getFilms(this._filter);
        this._sortFilms();

        if(payload.value === true) {
          this._addFilm(payload.filmId);
        } else {
          this._removeFilm(presenter);
        }
      }

      this._rerenderMenuCallback();
      this._renderSortMenu();
    }
  }

  _addFilm(filmId) {
    const filmIndex = this._films.findIndex((film) => film.id === filmId);

    if(filmIndex === 0 || filmIndex < this._lastFilmIndex) {

      console.log(this._lastFilmIndex);
      if(this._lastFilmIndex % config.FILMS_IN_LINE === 0) {
        let presenterToDelete;
        for(const key of this._filmPresenters.keys()) {
          const presenter = this._filmPresenters.get(key);
          if(key.type === 'film_list') {
            presenterToDelete = presenter;
          }
        }
        this._lastFilmIndex--;

        if(presenterToDelete) {
          if(presenterToDelete.filmCard) {
            presenterToDelete.filmCard.removeElement();
            presenterToDelete.filmCard = null;
          }
        }
      }

      this._renderFilmCard(this._films[filmIndex], this._view.filmList, 'film_list', filmIndex);
      this._lastFilmIndex++;
    }
    this._renderShowMoreButton();
  }

  _removeFilm(presenter) {
    // DIRTY HACK wrong presenter
    if(presenter.filmCard) {
      presenter.filmCard.removeElement();
      presenter.filmCard = null;
    }
    this._lastFilmIndex--;
    if(this._films.length > this._lastFilmIndex) {
      this._renderFilmCard(this._films[this._lastFilmIndex], this._view.filmList, 'film_list');
      this._lastFilmIndex++;
    }
    this._renderShowMoreButton();
  }

  _renderMoreFilms() {
    const films = this._films.slice(this._lastFilmIndex, this._lastFilmIndex + config.FILMS_IN_LINE);
    while(films.length !== 0) {
      this._renderFilmCard(films.shift(), this._view.filmList, 'film_list');
      this._lastFilmIndex++;
    }
    this._renderShowMoreButton();
  }

  _rerenderFilms() {
    this.remove();

    this._lastFilmIndex = 0;
    this._renderSortMenu();
    this._sortFilms();
    this._renderFilmList();
    this._renderMoreFilms();

    // this._renderTopRated();
    // this._renderMostCommented();
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

  _renderFilmCard(film, view, type, renderAtIndex) {
    let oldPresenter;
    for(const key of this._filmPresenters.keys()) {
      if(key.id === film.id && key.type === type) {
        oldPresenter = this._filmPresenters.get(key);
      }
    }

    if(oldPresenter) {
      oldPresenter.renderFilmCard(renderAtIndex);
    } else {
      this._filmPresenters.set(
        {id: film.id, type},
        new FilmPresenter(
          view.getElement().querySelector('.films-list__container'),
          film,
          this._onFilmPropertyChange.bind(this, film, 'isInWatchList'),
          this._onFilmPropertyChange.bind(this, film, 'isWatched'),
          this._onFilmPropertyChange.bind(this, film, 'isFavorite'),
          this._onFilmCommentsChange.bind(this, film),
          renderAtIndex,
        ),
      );
    }
  }

  _sortFilms() {
    if(this._sortMenu.selected === 'default') {
      this._films = utils.sortBy(this._films,
        (film) => film.id,
      );
    } else if(this._sortMenu.selected === 'rating') {
      this._films = utils.sortBy(this._films,
        (film) => parseFloat(film.totalRating),
      );
    } else if(this._sortMenu.selected === 'date') {
      this._films = utils.sortBy(this._films,
        (film) => {
          const date = new Date(film.release.date);
          return date.getTime();
        },
      );
    }
  }

  _renderSortMenu() {
    if(this._view.sortMenu) {
      this._view.sortMenu.removeElement();
    }
    this._view.sortMenu = new SortMenuView(this._sortMenu);
    this._view.sortMenu.addListener((menuType) => {
      this._sortMenu.selected = menuType;
      this._rerenderFilms();
    });

    const element = this._container.firstElementChild;
    element.parentNode.insertBefore(this._view.sortMenu.getElement(), element.nextSibling);
  }

  _renderFilmList() {
    this._view.filmList = new FilmListView();
    utilsRender.renderView(this._container, this._view.filmList);
  }

  _renderTopRated() {
    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => parseFloat(film.totalRating),
    ).slice(0,2);
    this._view.topRated = new FilmExtraTopRatedView();
    for(const film of films){
      this._renderFilmCard(film, this._view.topRated, 'top_rated');
    }
    utilsRender.renderView(this._view.filmList.getElement(), this._view.topRated);
  }

  _renderMostCommented() {
    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => film.comments.length,
    ).slice(0,2);
    this._view.mostCommented = new FilmExtraMostCommentedView();
    for(const film of films) {
      this._renderFilmCard(film, this._view.mostCommented, 'most_commented');
    }
    utilsRender.renderView(this._view.filmList.getElement(), this._view.mostCommented);
  }

  _renderShowMoreButton() {
    this._removeShowMoreButton();

    if(this._lastFilmIndex >= this._films.length) {
      return;
    }

    this._view.showMoreButton = new ShowMoreButtonView(this._renderMoreFilms.bind(this));
    utilsRender.renderView(
      this._view.filmList.getElement().querySelector('.films-list'),
      this._view.showMoreButton,
    );
  }

  _removeShowMoreButton() {
    if(this._view.showMoreButton !== null) {
      this._view.showMoreButton.removeElement();
      this._view.showMoreButton = null;
    }
  }
}

export default FilmList;
