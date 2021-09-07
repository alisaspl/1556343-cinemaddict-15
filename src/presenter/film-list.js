import config from '../config';
import utils from '../utils/common';
import utilsRender from '../utils/render';

import FilmPresenter from './film';
import StatisticsPresenter from './statistics';

import EmptyView from '../view/empty';
import FilmListView from '../view/film-list';
import MenuView from '../view/menu';
import SortMenuView from '../view/sort-menu';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';
import ShowMoreButtonView from '../view/show-more-button';

class FilmList {
  constructor(container) {
    this._container = container;

    this._data = {
      films: null,
      filmsCopy: null,
      menu: null,
      sortMenu: null,
      user: null,
      filmStatistics: null,
    };

    this._view = {
      empty: null,
      menu: null,
      sortMenu: null,
      filmList: null,
      filmCard: null,
      topRated: null,
      mostCommented: null,
      showMoreButton: null,
      statistics: null,
    };

    this._filmPresenters = new Map();
    this._statisticsPresenter = null;

    this._lastFilmIndex = 0;
  }

  init(films, menu, sortMenu, user, filmStatistics){
    this._data = {
      films,
      filmsCopy: [...films],
      menu,
      sortMenu,
      user,
      filmStatistics,
    };
    this._renderMenu();
    this._rerenderFilms();
  }

  _getSelectedMenu() {
    for(const menu of this._data.menu) {
      if(menu.selected) {
        return menu;
      }
    }
  }

  _rerenderFilms() {
    this._data.filmsCopy = [...this._data.films];
    const menu = this._getSelectedMenu();

    switch(menu.type) {
      case 'watchlist':
        this._data.filmsCopy = this._data.filmsCopy.filter((element) => !!element.isInWatchList);
        break;
      case 'history':
        this._data.filmsCopy = this._data.filmsCopy.filter((element) => !!element.isWatched);
        break;
      case 'favorites':
        this._data.filmsCopy = this._data.filmsCopy.filter((element) => !!element.isFavorite);
        break;
    }

    if(!this._data.filmsCopy || this._data.filmsCopy.length === 0) {
      this._renderEmpty();
    } else {
      this._clearMainContainer();

      if(menu.type === 'stats') {
        this._renderStatistics();
      } else {
        this._renderSortMenu();
        this._renderFilmList();
        this._renderShowMoreButton();
        this._renderNextElements();
        this._renderTopRated();
        this._renderMostCommented();
      }
    }
  }

  _clearMainContainer() {
    this._lastFilmIndex = 0;
    for(const key in this._view) {
      if(this._view[key] !== null && key !== 'menu') {
        this._view[key].removeElement();
      }
    }
    if(this._statisticsPresenter !== null) {
      this._statisticsPresenter.remove();
      this.StatisticsPresenter = null;
    }
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
    this._renderMenu();
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
      ),
    );
  }

  _renderEmpty() {
    this._clearMainContainer();
    this._view.empty = new EmptyView(this._getSelectedMenu());
    utilsRender.renderView(this._container, this._view.empty);
  }

  _renderMenu() {
    if(this._view.menu !== null) {
      this._view.menu.removeElement();
    }
    const stat = {
      favorites: 0,
      watchlist: 0,
      watched: 0,
    };
    for(const film of this._data.films) {
      if(film.isInWatchList) {
        stat.watchlist++;
      }
      if(film.isWatched) {
        stat.watched++;
      }
      if(film.isFavorite) {
        stat.favorites++;
      }
    }

    const selectedMenu = this._getSelectedMenu();

    this._view.menu = new MenuView(selectedMenu, stat);
    this._view.menu.addListener(
      (menuType) => {
        for(const menu of this._data.menu) {
          if(menu.type === menuType) {
            menu.selected = true;
          } else {
            menu.selected = false;
          }
        }

        this._renderMenu();

        this._data.sortMenu.selected = 'default';

        switch(menuType) {
          case 'stats':
            this._clearMainContainer();
            this._renderStatistics();
            break;
          case 'allMovies':
            this._rerenderFilms();
            break;
          case 'watchlist':
            this._rerenderFilms();
            break;
          case 'history':
            this._rerenderFilms();
            break;
          case 'favorites':
            this._rerenderFilms();
            break;
        }
      },
    );
    utilsRender.renderView(this._container, this._view.menu, utilsRender.RenderPosition.AFTERBEGIN);
  }

  _renderStatistics() {
    this._statisticsPresenter = new StatisticsPresenter(this._container, this._data.user, this._data.films, this._data.filmStatistics.selectedMenu);
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
