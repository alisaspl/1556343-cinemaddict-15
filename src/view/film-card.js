export const createFilmCardTemplate = (film) => `
<article class="film-card">
  <h3 class="film-card__title">${film.title}</h3>
  <p class="film-card__rating">${film.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film.release.date.split(' ')[2]}</span>
    <span class="film-card__duration">${film.runtime}</span>
    <span class="film-card__genre">${film.genres[0]}</span>
  </p>
  <img src="./${film.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${film.description.length > 140 ? `${film.description.slice(0, 139)}...` : film.description}</p>
  <a class="film-card__comments">${film.comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${film.isInWatchList ? 'film-card__controls-item--active' : ''}" type="button">Add to
      watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${film.isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as
      watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${film.isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as
      favorite</button>
  </div>
</article>
`;
