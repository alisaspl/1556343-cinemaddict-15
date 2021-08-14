export const createUserProfileTemplate = (user) => `
  <p class="profile__rating">${user.rank}</p>
  <img class="profile__avatar" src="${user.avatar}" alt="Avatar" width="35" height="35">
`;
