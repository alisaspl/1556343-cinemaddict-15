import dayjs from 'dayjs';

import utils from './utils/common';

const titles = [
  'made for each other',
  'popeye meets sinbad',
  'sagebrush trail',
  'santa claus conquers the martians',
  'the dance of life',
  'the great flamarion',
  'the man with the golden arm',
];

const originalTitles = [
  'O made for each other',
  'O popeye meets sinbad',
  'O sagebrush trail',
  'O santa claus conquers the martians',
  'O the dance of life',
  'O the great flamarion',
  'O the man with the golden arm',
];

const genres = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const descriptions = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.
`.split('.');
descriptions.pop();

const posters =  [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const comments = [
  {
    text: 'Interesting setting and a good cast',
    emoji: {
      src: 'images/emoji/smile.png',
      name: 'smile',
    },
    author: 'Tim Macoveev',
    date: '1999-12-31T23:59:59.554Z',
  },
  {
    text: 'Booooooooooring',
    emoji: {
      src: 'images/emoji/sleeping.png',
      name: 'sleeping',
    },
    author: 'John Doe',
    date: '2021-09-10T14:00:59.554Z',
  },
  {
    text: 'Very very old. Meh',
    emoji: {
      src: 'images/emoji/puke.png',
      name: 'puke',
    },
    author: 'Bob',
    date: '2019-11-31T23:59:59.554Z',
  },
  {
    text: 'Almost two hours? Seriously?',
    emoji: {
      src: 'images/emoji/angry.png',
      name: 'angry',
    },
    author: 'Alice',
    date: '2021-09-12T14:00:59.554Z',
  },
  {
    text: 'Awesome',
    emoji: {
      src: 'images/emoji/smile.png',
      name: 'smile',
    },
    author: 'Charlie',
    date: new Date(),
  },
];

const directors = [
  'Tom Ford',
  'Fom Tord',
  'Tod Form',
  'Fod Torm',
  'Anthony Man',
];

const actors = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
];

const writers = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const releases = [
  {
    date: '05-10-1999',
    releaseCountry: 'Finland',
  },
  {
    date: '10-04-2000',
    releaseCountry: 'USA',
  },
  {
    date: '17-02-1945',
    releaseCountry: 'Russia',
  },
  {
    date: '28-03-1938',
    releaseCountry: 'France',
  },
];

const mainMenuTitles = [
  {
    type: 'allMovies',
    emptyText: 'There are no movies in our database',
  },
  {
    type: 'isInWatchList',
    emptyText: 'There are no movies to watch now',
  },
  {
    type: 'isWatched',
    emptyText: 'There are no watched movies now',
  },
  {
    type: 'isFavorite',
    emptyText: 'There are no favorite movies now',
  },
  {
    type: 'stats',
    emptyText: 'No stat sorry',
  },
];

const sortMenuTitles = [
  'default',
  'date',
  'rating',
];

const statisticsMenuTitles = [
  'all-time',
  'today',
  'week',
  'month',
  'year',
];

const userAvatars = [
  'bitmap.png',
  'bitmap@2x.png',
  'bitmap@3x.png',
];

const userRanks = [
  'Movie Buff',
  'Movie Looser',
  'Movie Horror',
];

const generateFilmDescription = (sentences) => {
  const randomDescription = [];
  for(let i = 0; i <= utils.getRandomInteger(0, 4); i++){
    randomDescription.push(sentences[utils.getRandomInteger(0, sentences.length - 1)]);
  }

  return `${randomDescription.join('. ')}.`;
};

let id = 0;

const today = new Date();

const generateFilmData = () => ({
  id: id++,
  title: utils.getRandomElementFromArray(titles),
  originalTitle: utils.getRandomElementFromArray(originalTitles),
  poster: `images/posters/${utils.getRandomElementFromArray(posters)}`,
  description: generateFilmDescription(descriptions),
  comments: utils.getRandomUniqArray(comments),
  genres: utils.getRandomUniqArray(genres),
  director: utils.getRandomElementFromArray(directors),
  actors: utils.getRandomUniqArray(actors),
  writers: utils.getRandomUniqArray(writers),
  release: utils.getRandomElementFromArray(releases),
  totalRating: (utils.getRandomInteger(0, 100)/10).toFixed(1),
  runtime: utils.getRandomInteger(30, 240),
  isWatched: utils.getRandomInteger(0,1),
  isInWatchList: utils.getRandomInteger(0,1),
  isFavorite: utils.getRandomInteger(0,1),
  watchingDate: dayjs.unix(utils.getRandomInteger(today.getTime()/1000 - 2*356*24*60*60, today.getTime()/1000)),
  ageRating: utils.getRandomInteger(0, 18),
});

const filmListData = new Array(25).fill().map(() => generateFilmData());

const userData =  {
  avatar:  `images/${utils.getRandomElementFromArray(userAvatars)}`,
  rank: utils.getRandomElementFromArray(userRanks),
};

const menuData = mainMenuTitles;
menuData[utils.getRandomInteger(0, menuData.length-1)].selected = true;

const sortMenuData = {
  selected: utils.getRandomElementFromArray(sortMenuTitles),
};
const filmsStatisticsData = {
  selectedMenu: utils.getRandomElementFromArray(statisticsMenuTitles),
  allFilms: utils.getRandomInteger(0, 10000000),
};

export { filmListData, menuData, sortMenuData, filmsStatisticsData, userData };
