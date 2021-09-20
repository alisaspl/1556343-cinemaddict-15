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
import MenuModel from '../model/menu';

import { sortMenuData } from '../mocks';

class FilmList {
  constructor(container, filmModel, menuModel) {
    this._container = container;

    this._onFilmDataChange = this._onFilmDataChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);

    this._filter = menuModel.getSelected().type;

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

    this._menuModel = menuModel;
    this._menuModel.addObserver(this._onMenuChange);

    this._lastFilmIndex = 0;
    this._films = this._filmModel.getFilms(this._filter);
    this._rerenderFilms();
  }

  remove(final) {
    this._lastFilmIndex = 0;

    for(const key in this._view) {
      if(this._view[key] !== null) {
        this._view[key].removeElement();
        this._view[key] = null;
      }
    }

    for(const key of this._filmPresenters.keys()) {
      const presenter = this._filmPresenters.get(key);
      if(presenter.filmCardDetails === null) {
        this._filmPresenters.delete(key);
      }
    }

    console.log(this._filmPresenters);

    // this._filmPresenters = new Map();

    if(final) {
      this._filmModel.removeObserver(this._onFilmDataChange);
    }
  }

  _onFilmPropertyChange(film, property, value) {
    this._filmModel.updateFilm(film.id, property, value);
  }

  _onFilmDataChange(event, eventPayload) {
    if(event === FilmModel.CHANGE_EVENT) {
      const presenters = [];
      for(const key of this._filmPresenters.keys()) {
        const presenter = this._filmPresenters.get(key);
        if(key.id === eventPayload.filmId) {
          presenters.push({ presenter, payload: eventPayload, type: key.type });
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
          continue;
        }
      }

      this._films = this._filmModel.getFilms(this._filter);
      this._sortFilms();
      if(this._view.filmList === null) {
        this._renderFilmList();
      }

      if(eventPayload.property === this._filter) {
        if(eventPayload.value === true) {
          this._addFilm(eventPayload.filmId);
        } else if(eventPayload.value === false) {
          this._removeFilm(eventPayload.filmId);
        }
      }

      this._renderShowMoreButton();
      if(this._films.length !== 0) {
        this._renderSortMenu();
        // this._renderTopRated();
        // this._renderMostCommented();
      }
    }
  }

  _addFilm(filmId) {
    const filmIndex = this._films.findIndex((film) => film.id === filmId);
    if(filmIndex === 0 || filmIndex <= this._lastFilmIndex) {
      let needRenderCard = true;

      if(this._lastFilmIndex % config.FILMS_IN_LINE === 0 && filmIndex !== 0 && this._lastFilmIndex !== 0) {
        needRenderCard = false;

        const presentersToDelete = {};
        for(const key of this._filmPresenters.keys()) {
          const presenter = this._filmPresenters.get(key);
          if(key.type === 'film_list' && presenter.filmCard !== null) {
            const index = this._films.findIndex((element) => element.id === presenter.filmCard.id);
            presentersToDelete[index] = presenter;
          }
        }

        const indexToDelete = Math.max(
          ...Object.keys(presentersToDelete).map((element) => parseInt(element, 10)),
        );
        const presenterToDelete = presentersToDelete[indexToDelete];

        if(filmIndex < indexToDelete && presenterToDelete && presenterToDelete.filmCard) {
          needRenderCard = true;
          presenterToDelete.filmCard.removeElement();
          presenterToDelete.filmCard = null;
          if(this._lastFilmIndex > 0) {
            this._lastFilmIndex--;
          }
        }
      }

      if(needRenderCard) {
        this._renderFilmCard(this._films[filmIndex], this._view.filmList, 'film_list', filmIndex);
        this._lastFilmIndex++;
      }

    }
  }

  _removeFilm(filmId) {
    let presenterToDelete = null;
    for(const key of this._filmPresenters.keys()) {
      const presenter = this._filmPresenters.get(key);
      if(key.type === 'film_list' && key.id === filmId && presenter.filmCard !== null) {
        presenterToDelete = presenter;
      }
    }

    if(presenterToDelete !== null) {
      if(presenterToDelete.filmCard) {
        presenterToDelete.filmCard.removeElement();
        presenterToDelete.filmCard = null;
      }

      this._lastFilmIndex--;

      if(this._films.length > this._lastFilmIndex) {
        this._renderFilmCard(this._films[this._lastFilmIndex], this._view.filmList, 'film_list');
        this._lastFilmIndex++;
      }
    }
    if(this._films.length === 0) {
      this.remove();
    }
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

  _onMenuChange(event, eventPayload) {
    if(event !== MenuModel.CHANGE_EVENT){
      return;
    }
    if(eventPayload.type === 'stats') {
      this.remove();
    } else {
      this.remove();
      this._filter = eventPayload.type;
      this._films = this._filmModel.getFilms(eventPayload.type);
      this._sortMenu.selected = 'default';
      if(this._films.length !== 0) {
        this._sortFilms();
        this._rerenderFilms();
      }
    }
  }

  _onFilmCommentsChange(film, value) {
    // this._renderMostCommented();
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

    if(oldPresenter && type === 'film_list') {
      oldPresenter.renderFilmCard(renderAtIndex, view.getElement().querySelector('.films-list__container'));
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
      this._view.sortMenu = null;
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

  // _renderTopRated() {
  //   if(this._view.topRated !== null) {
  //     this._view.topRated.removeElement();
  //     this._view.topRated = null;
  //   }
  //   const films = utils.sortBy(this._filmModel.getFilms(),
  //     (film) => parseFloat(film.totalRating),
  //   ).slice(0,2);
  //   this._view.topRated = new FilmExtraTopRatedView();
  //   for(const film of films){
  //     this._renderFilmCard(film, this._view.topRated, 'top_rated');
  //   }
  //   utilsRender.renderView(this._view.filmList.getElement(), this._view.topRated);
  // }

  // _renderMostCommented() {
  //   if(this._view.mostCommented !== null) {
  //     this._view.mostCommented.removeElement();
  //     this._view.mostCommented = null;
  //   }

  //   const films = utils.sortBy(this._filmModel.getFilms(),
  //     (film) => film.comments.length,
  //   ).slice(0,2);

  //   this._view.mostCommented = new FilmExtraMostCommentedView();
  //   for(const film of films) {
  //     this._renderFilmCard(film, this._view.mostCommented, 'most_commented');
  //   }

  //   utilsRender.renderView(this._view.filmList.getElement(), this._view.mostCommented);
  // }

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
