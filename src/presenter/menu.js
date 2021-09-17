import utilsRender from '../utils/render';

import MenuView from '../view/menu';
import EmptyView from '../view/empty';

import StatisticsPresenter from '../presenter/statistics';
import FilmListPresenter from '../presenter/film-list';

class Menu {
  constructor(container, menuModel, filmsModel, userModel) {
    this._container = container;

    this._menuView = null;
    this._emptyView = null;

    this._menuModel = menuModel;
    this._filmsModel = filmsModel;
    this._userModel = userModel;

    this._filmsPresenter = null;
    this._statisticsPresenter = null;

    this._renderMenu();

    const selectedMenu = this._menuModel.getSelected();
    this._onMenuChange(selectedMenu.type);
  }

  _clearMainContainer() {
    if(this._emptyView !== null) {
      this._emptyView.removeElement();
      this._emptyView = null;
    }
    if(this._filmsPresenter !== null) {
      this._filmsPresenter.remove(true);
      this._filmsPresenter = null;
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

  _renderFilms() {
    this._filmsPresenter = new FilmListPresenter(
      this._container,
      this._filmsModel,
      this._menuModel.getSelected().type,
      this._renderMenu.bind(this),
    );
  }

  _renderEmpty() {
    this._emptyView = new EmptyView(this._menuModel.getSelected());
    utilsRender.renderView(this._container, this._emptyView);
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

    if(this._filmsModel.getFilms(menuType).length === 0) {
      this._renderEmpty();
    } else {
      this._renderFilms();
    }

  }

}

export default Menu;
