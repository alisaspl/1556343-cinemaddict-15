import config from '../config';
import utilsRender from '../utils/render';

import EmptyView from '../view/empty';
import FilmListView from '../view/film-list';
import SortMenuView from '../view/sort-menu';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';
import ShowMoreButtonView from '../view/show-more-button';
import FilmCardView from '../view/film-card';

class FilmListPresenter {
  constructor(container) {
    this._container = container;

    this._data = {
      films: null,
      menu: null,
      sortMenu: null,
    };

    this._view = {
      empty: null,
      sortMenu: null,
      filmList: null,
      filmCard: null,
      topRated: null,
      mostCommented: null,
      showMoreButton: null,
    };

    this._lastFilmIndex = 0;
  }

  init(films, menu, sortMenu){
    this._data = {
      films,
      menu,
      sortMenu,
    };

    if(!this._data.films || this._data.films.length === 0) {
      this._renderEmpty();
    } else {
      this._renderSortMenu();
      this._renderFilmList();
      this._renderShowMoreButton();
      this._renderNextElements();
      this._renderTopRated();
      this._renderMostCommented();
    }
  }

  _renderEmpty() {
    this._view.empty = new EmptyView(this._data.menu);
    utilsRender.renderView(this._container, this._view.empty);
  }

  _renderSortMenu() {
    this._view.sortMenu = new SortMenuView(this._data.sortMenu);
    utilsRender.renderView(this._container, this._view.sortMenu);
  }

  _renderFilmList() {
    this._view.filmList = new FilmListView();
    utilsRender.renderView(this._container, this._view.filmList);
  }

  _renderFilmCard(film) {
    this._view.filmCard = new FilmCardView(film);
    utilsRender.renderView(
      this._view.filmList.getElement().querySelector('.films-list__container'),
      this._view.filmCard,
    );
  }

  _renderTopRated() {
    this._view.topRated = new FilmExtraTopRatedView(this._data.films);
    utilsRender.renderView(this._view.filmList.getElement(), this._view.topRated);
  }

  _renderMostCommented() {
    this._view.mostCommented = new FilmExtraMostCommentedView(this._data.films);
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
      this._renderFilmCard(this._data.films[this._lastFilmIndex]);

      if(this._lastFilmIndex === this._data.films.length - 1){
        this._view.showMoreButton.removeElement();
        break;
      }
    }
  }
}

export default FilmListPresenter;
