import utilsRender from '../utils/render';

import MenuView from '../view/menu';
import EmptyView from '../view/empty';

import FilmsModel from '../model/films';

import StatisticsPresenter from '../presenter/statistics';
import config from '../config';

class Menu {
  constructor(container, menuModel, filmsModel, userModel) {
    this._container = container;

    this._menuView = null;
    this._emptyView = null;

    this._menuModel = menuModel;
    this._filmsModel = filmsModel;
    this._userModel = userModel;

    this._statisticsPresenter = null;

    this._inited = false;

    const selectedMenu = this._menuModel.getSelected();
    this._onMenuChange(selectedMenu.type);

    this._filmsModel.addObserver((event) => {
      if(event === FilmsModel.CHANGE_EVENT) {
        this._onFilmsChange(this._menuModel.getSelected().type);
      } else if(event === FilmsModel.INIT_EVENT) {
        this._inited = true;
        this._onMenuChange(selectedMenu.type);
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

  _renderEmpty(menuType) {
    if(this._filmsModel.getFilms(menuType).length === 0) {
      if(this._inited) {
        this._emptyView = new EmptyView(this._menuModel.getSelected());
        utilsRender.renderView(this._container, this._emptyView);
      } else {
        this._emptyView = new EmptyView({emptyText: config.LOADING_TEXT});
        utilsRender.renderView(this._container, this._emptyView);
      }
    }
  }

  _renderStatistics() {
    this._statisticsPresenter = new StatisticsPresenter(this._container, this._userModel.getUser(), this._filmsModel.getFilms());
  }

  _onMenuChange(menuType) {
    this._menuModel.setSelected(menuType);
    this._renderMenu();
    this._clearMainContainer();

    if(menuType === 'stats') {
      this._renderStatistics();
      return;
    }
    this._renderEmpty(menuType);
  }

  _onFilmsChange(menuType) {
    this._renderMenu();
    this._clearMainContainer();
    this._renderEmpty(menuType);
  }

}

export default Menu;
