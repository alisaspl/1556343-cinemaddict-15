import config from '../config';
import utils from '../utils/common';
import utilsRender from '../utils/render';

import FilmPresenter from './film';
import FilmExtraPresenter from './film-extra';

import FilmListView from '../view/film-list';
import SortMenuView from '../view/sort-menu';
import ShowMoreButtonView from '../view/show-more-button';

import FilmModel from '../model/films';
import MenuModel from '../model/menu';

import { sortMenuData } from '../mocks';

class FilmList {
  constructor(container, filmModel, menuModel) {
    this._container = container;

    this._onFilmDataChange = this._onFilmDataChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);

    this._filmModel = filmModel;
    this._filmModel.addObserver(this._onFilmDataChange);
    this._menuModel = menuModel;
    this._menuModel.addObserver(this._onMenuChange);

    this._view = {
      sortMenu: null,
      filmList: null,
      filmCard: null,
      showMoreButton: null,
    };

    this._filmPresenters = new Map();
    this._filmExtraPresenter = null;

    this._filter = menuModel.getSelected().type;

    this._sortMenu = sortMenuData;
    this._sortMenu.selected = 'default';

    this._lastFilmIndex = 0;
    this._films = this._filmModel.getFilms(this._filter);

    // this._rerenderFilms();
  }

  remove(final) {
    this._lastFilmIndex = 0;

    for(const key in this._view) {
      if(this._view[key] !== null) {
        this._view[key].removeElement();
        this._view[key] = null;
      }
    }

    if(this._filmExtraPresenter !== null) {
      this._filmExtraPresenter.remove();
      this._filmExtraPresenter = null;
    }

    if(final) {
      this._filmModel.removeObserver(this._onFilmDataChange);
    }
  }

  _onFilmDataChange(event, payload) {
    if(event === FilmModel.CHANGE_EVENT) {
      const presenter = this._filmPresenters.get(payload.filmId);

      if(presenter && presenter.filmCard !== null) {
        presenter.filmCard[payload.property] = payload.value;
      }

      this._films = this._filmModel.getFilms(this._filter);
      this._sortFilms();

      if(this._view.filmList === null) {
        this._renderFilmList();
      }

      if(payload.property === this._filter) {
        if(payload.value === true) {
          this._addFilm(payload.filmId);
        } else if(payload.value === false) {
          this._removeFilm(payload.filmId);
        }
      }

      this._renderShowMoreButton();
      if(this._films.length !== 0) {
        this._renderSortMenu();
      }
    }
  }

  _addFilm(filmId) {
    const filmIndex = this._films.findIndex((film) => film.id === filmId);

    if(filmIndex <= this._lastFilmIndex) {
      let needRenderCard = true;

      if(this._lastFilmIndex % config.FILMS_IN_LINE === 0 && this._lastFilmIndex !== 0) {
        needRenderCard = false;

        if(this._films[this._lastFilmIndex-1].id !== filmId) {
          needRenderCard = true;
          const presenterToDelete = this._filmPresenters.get(this._films[this._lastFilmIndex].id);
          presenterToDelete.filmCard.removeElement();
          presenterToDelete.filmCard = null;

          if(this._lastFilmIndex > 0) {
            this._lastFilmIndex--;
          }
        }
      }

      if(needRenderCard) {
        this._renderFilmCard(this._films[filmIndex], this._view.filmList, filmIndex);
        this._lastFilmIndex++;
      }

    }
  }

  _removeFilm(filmId) {
    const presenterToDelete = this._filmPresenters.get(filmId);
    if(presenterToDelete && presenterToDelete.filmCard !== null) {
      presenterToDelete.filmCard.removeElement();
      presenterToDelete.filmCard = null;

      this._lastFilmIndex--;

      if(this._films.length > this._lastFilmIndex) {
        this._renderFilmCard(this._films[this._lastFilmIndex], this._view.filmList);
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
      this._renderFilmCard(films.shift(), this._view.filmList);
      this._lastFilmIndex++;
    }
    this._renderShowMoreButton();
  }

  _renderExtraFilms() {
    this._filmExtraPresenter = new FilmExtraPresenter(
      this._view.filmList.getElement(),
      this._filmModel,
    );
  }

  _rerenderFilms() {
    this.remove();

    this._lastFilmIndex = 0;
    this._renderSortMenu();
    this._sortFilms();
    this._renderFilmList();
    this._renderMoreFilms();
    this._renderExtraFilms();
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

  _renderFilmCard(film, view, renderAtIndex) {
    const oldPresenter = this._filmPresenters.get(film.id);
    if(oldPresenter) {
      oldPresenter.renderFilmCard(renderAtIndex, view.getElement().querySelector('.films-list__container'));
    } else {
      this._filmPresenters.set(
        film.id,
        new FilmPresenter(
          view.getElement().querySelector('.films-list__container'),
          film,
          this._filmModel,
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
