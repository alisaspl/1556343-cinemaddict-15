import utilsRender from '../utils/render';

import MenuView from '../view/menu';
import EmptyView from '../view/empty';
import FilmExtraTopRatedView from '../view/film-extra-top-rated';
import FilmExtraMostCommentedView from '../view/film-extra-most-commented';

import FilmsModel from '../model/films';

import StatisticsPresenter from '../presenter/statistics';

class Menu {
  constructor(container, menuModel, filmsModel, userModel) {
    this._container = container;

    this._menuView = null;
    this._emptyView = null;

    this._menuModel = menuModel;
    this._filmsModel = filmsModel;
    this._userModel = userModel;

    this._statisticsPresenter = null;

    this._renderMenu();

    const selectedMenu = this._menuModel.getSelected();
    this._onMenuChange(selectedMenu.type);

    this._filmsModel.addObserver((event) => {
      if(event === FilmsModel.CHANGE_EVENT) {
        this._onMenuChange(this._menuModel.getSelected().type);
      }
    });
  }

  _clearMainContainer() {
    if(this._emptyView !== null) {
      this._emptyView.removeElement();
      this._emptyView = null;
    }
    if(this._statisticsPresenter !== null) {
      this._statisticsPresenter.remove();
      this._statisticsPresenter = null;
    }
  }

  _renderMenu() {
    if(this._menuView !== null) {
      this._menuView.removeElement();
    }

    const stat = {
      favorites: 0,
      watchlist: 0,
      watched: 0,
    };
    for(const film of this._filmsModel.getFilms()) {
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

    this._menuView = new MenuView(this._menuModel.getSelected(), stat);
    this._menuView.getElement();
    this._menuView.addListener(this._onMenuChange.bind(this));

    utilsRender.renderView(this._container, this._menuView, utilsRender.RenderPosition.AFTERBEGIN);
  }

  _renderEmpty() {
    this._emptyView = new EmptyView(this._menuModel.getSelected());
    utilsRender.renderView(this._container, this._emptyView);
  }

  _renderStatistics() {
    this._statisticsPresenter = new StatisticsPresenter(this._container, this._userModel.getUser(), this._filmsModel.getFilms());
  }

  _renderTopRated() {
    if(this._view.topRated !== null) {
      this._view.topRated.removeElement();
      this._view.topRated = null;
    }
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
    if(this._view.mostCommented !== null) {
      this._view.mostCommented.removeElement();
      this._view.mostCommented = null;
    }

    const films = utils.sortBy(this._filmModel.getFilms(),
      (film) => film.comments.length,
    ).slice(0,2);

    this._view.mostCommented = new FilmExtraMostCommentedView();
    for(const film of films) {
      this._renderFilmCard(film, this._view.mostCommented, 'most_commented');
    }

    utilsRender.renderView(this._view.filmList.getElement(), this._view.mostCommented);
  }

  _onMenuChange(menuType) {
    this._menuModel.setSelected(menuType);
    this._renderMenu();
    this._clearMainContainer();

    if(menuType === 'stats') {
      this._renderStatistics();
      return;
    }

    if(this._filmsModel.getFilms(menuType).length === 0) {
      this._renderEmpty();
    } else {
      // this._renderTopRated();
      // this._renderMostCommented();
    }
  }

}

export default Menu;
