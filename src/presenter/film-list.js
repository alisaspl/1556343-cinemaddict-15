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


class FilmListPresenter {
  constructor(container) {
    this._container = container;

    this._data = {
      films: null,
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
      menu,
      sortMenu,
      user,
      filmStatistics,
    };

    if(!this._data.films || this._data.films.length === 0) {
      this._renderEmpty();
    } else {
      this._rerenderFilms();
    }
  }

  _rerenderFilms() {
    this._clearMainContainer();
    this._renderSortMenu();
    this._renderFilmList();
    this._renderShowMoreButton();
    this._renderNextElements();
    this._renderTopRated();
    this._renderMostCommented();
  }

  _clearMainContainer() {
    this._lastFilmIndex = 0;
    for(const key in this._view) {
      if(this._view[key] !== null) {
        this._view[key].removeElement();
      }
    }
    if(this._statisticsPresenter !== null) {
      this._statisticsPresenter.remove();
      this.StatisticsPresenter = null;
    }
    this._renderMenu();
  }

  _renderFilmCard(film, view) {
    this._filmPresenters.set(
      {id: film.id, view},
      new FilmPresenter(
        view.getElement().querySelector('.films-list__container'),
        film,
        (isInWatchList) => {
          for(const key of this._filmPresenters.keys()) {
            const presenter = this._filmPresenters.get(key);
            if(key.id === film.id) {
              presenter.filmCard.isInWatchList = isInWatchList;
              if(presenter.filmCardDetails !== null) {
                presenter.filmCardDetails.isInWatchList = isInWatchList;
              }
            }
          }
          this._renderMenu();
        },
        (isWatched) => {
          for(const key of this._filmPresenters.keys()) {
            const presenter = this._filmPresenters.get(key);
            if(key.id === film.id) {
              presenter.filmCard.isWatched = isWatched;
              if(presenter.filmCardDetails !== null) {
                presenter.filmCardDetails.isWatched = isWatched;
              }
            }
          }
          this._renderMenu();
        },
        (isFavorite) => {
          for(const key of this._filmPresenters.keys()) {
            const presenter = this._filmPresenters.get(key);
            if(key.id === film.id) {
              presenter.filmCard.isFavorite = isFavorite;
              if(presenter.filmCardDetails !== null) {
                presenter.filmCardDetails.isFavorite = isFavorite;
              }
            }
          }
          this._renderMenu();
        },
      ),
    );
  }

  _renderEmpty() {
    this._view.empty = new EmptyView(this._data.menu);
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

    this._view.menu = new MenuView(this._data.menu, stat);
    this._view.menu.addListener(
      (menuType) => {
        this._data.menu.type = menuType;
        this._renderMenu();

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
    let filmList = [...this._data.films];

    switch(this._data.menu.type) {
      case 'watchlist':
        filmList = filmList.filter((element) => !!element.isInWatchList);
        break;
      case 'history':
        filmList = filmList.filter((element) => !!element.isWatched);
        break;
      case 'favorites':
        filmList = filmList.filter((element) => !!element.isFavorite);
        break;
    }
    const newLastIndex = this._lastFilmIndex + config.FILMS_IN_LINE;

    for(; this._lastFilmIndex < newLastIndex; this._lastFilmIndex++){
      this._renderFilmCard(filmList[this._lastFilmIndex], this._view.filmList);

      if(this._lastFilmIndex === filmList.length - 1){
        this._view.showMoreButton.removeElement();
        break;
      }
    }
  }
}

export default FilmListPresenter;
