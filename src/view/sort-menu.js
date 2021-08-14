export const createSortMenuTemplate = (sort) => `
<ul class="sort">
  <li><a href="#" class="sort__button ${sort.selected === 'default' ? 'sort__button--active' : ''}">Sort by default</a></li>
  <li><a href="#" class="sort__button ${sort.selected === 'date' ? 'sort__button--active' : ''}">Sort by date</a></li>
  <li><a href="#" class="sort__button ${sort.selected === 'rating' ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>
`;
