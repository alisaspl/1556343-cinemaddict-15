import utilsRender from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmsDetailsView from '../view/film-details';

class FilmPresenter {
  constructor(container, film) {
    this._film = film;
    this._container = container;

    this._filmCard = null;
    this._filmCardDetails = null;

    this._renderFilmCard();
  }

  _renderFilmCard() {
    this._filmCard = new FilmCardView(this._film, this._showFilmDetails.bind(this));
    utilsRender.renderView(this._container, this._filmCard);
  }

  _showFilmDetails() {
    this._filmCardDetails = new FilmsDetailsView(this._film);
    utilsRender.renderView(document.body, this._filmCardDetails);
  }
}

export default FilmPresenter;
