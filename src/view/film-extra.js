export const createFilmExtraTemplate = () => {
  return `
<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container films-list-top-rated">
  </div>
</section>

<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container films-list-most-commented">
  </div>
</section>
  `;
};
