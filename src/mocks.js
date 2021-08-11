const genres = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomUniqArray = (array) => {
  const numberOfElements = getRandomInteger(1, array.length - 1);
  const uniqArray = new Set();
  while(uniqArray.size < numberOfElements){
    uniqArray.add(array[getRandomInteger(0, array.length - 1)]);
  }
  return Array.from(uniqArray);
};

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

const generateFilmDescription = (sentences) => {
  const randomDescription = [];
  sentences = sentences.split('.');
  sentences.pop();

  for(let i = 0; i <= getRandomInteger(0, 4); i++){
    randomDescription.push(sentences[getRandomInteger(0, sentences.length - 1)]);
  }

  return `${randomDescription.join('. ')}.`;
};

const generateDuration = (runtime) => {
  const hours = (runtime/60).toFixed(0);
  const minutes = new String(runtime%60).padStart(2, 0);
  if(hours !== '0'){
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const generateFilmData = () => ({
  title: getRandomElementFromArray([
    'made for each other',
    'popeye meets sinbad',
    'sagebrush trail',
    'santa claus conquers the martians',
    'the dance of life',
    'the great flamarion',
    'the man with the golden arm',
  ]),
  originalTitle: getRandomElementFromArray([
    'O made for each other',
    'O popeye meets sinbad',
    'O sagebrush trail',
    'O santa claus conquers the martians',
    'O the dance of life',
    'O the great flamarion',
    'O the man with the golden arm',
  ]),
  poster: `images/posters/${getRandomElementFromArray([
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ])}`,
  description: generateFilmDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'),
  comments: getRandomUniqArray([
    {
      text: 'Interesting setting and a good cast',
      emoji: {
        src: 'images/emoji/smile.png',
        name: 'smile',
      },
      author: 'Tim Macoveev',
      date: '2019/12/31 23:59',
    },
    {
      text: 'Booooooooooring',
      emoji: {
        src: 'images/emoji/sleeping.png',
        name: 'sleeping',
      },
      author: 'John Doe',
      date: '2 days ago',
    },
    {
      text: 'Very very old. Meh',
      emoji: {
        src: 'images/emoji/puke.png',
        name: 'puke',
      },
      author: 'Bob',
      date: '2019/11/31 23:59',
    },
    {
      text: 'Almost two hours? Seriously?',
      emoji: {
        src: 'images/emoji/angry.png',
        name: 'angry',
      },
      author: 'Alice',
      date: 'Today',
    },
    {
      text: 'Awesome',
      emoji: {
        src: 'images/emoji/smile.png',
        name: 'smile',
      },
      author: 'Charlie',
      date: 'Just now',
    },
  ]),
  genres: getRandomUniqArray(genres),
  director: getRandomElementFromArray([
    'Tom Ford',
    'Fom Tord',
    'Tod Form',
    'Fod Torm',
    'Anthony Man',
  ]),
  actors: getRandomUniqArray([
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
  ]),
  writers: getRandomUniqArray([
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ]),
  release: getRandomElementFromArray([
    {
      date: '5 November 1999',
      releaseCountry: 'Finland',
    },
    {
      date: '10 April 2000',
      releaseCountry: 'USA',
    },
    {
      date: '17 February 1945',
      releaseCountry: 'Russia',
    },
    {
      date: '28 March 1938',
      releaseCountry: 'France',
    },
  ]),
  totalRating: (getRandomInteger(0, 100)/10).toFixed(1),
  runtime: generateDuration(getRandomInteger(1, 240)),
  isWatched: getRandomInteger(0,1),
  isInWatchList: getRandomInteger(0,1),
  isFavorite: getRandomInteger(0,1),
  ageRating: getRandomInteger(0, 18),
});

const generateMenuData = () => ({
  selected: getRandomElementFromArray([
    'allMovies',
    'watchlist',
    'history',
    'favorites',
    'stats',
  ]),
  historyFilmsNumber: getRandomInteger(0,1000),
  watchlistFilmsNumber: getRandomInteger(0,1000),
  favoritesFilmsNumber: getRandomInteger(0,1000),
});

const generateSortMenuData = () => ({
  selected: getRandomElementFromArray([
    'default',
    'date',
    'rating',
  ]),
});

const generateStatisticsData = () => ({
  selectedMenu: getRandomElementFromArray([
    'allTime',
    'today',
    'week',
    'month',
    'year',
  ]),
  watchedFilms: getRandomInteger(0, 10000),
  allFilms: getRandomInteger(0, 10000000),
  runtime: {
    hours: getRandomInteger(1, 2000),
    minutes: getRandomInteger(0, 59),
  },
  genre: getRandomElementFromArray(genres),
});

const generateUserDate = () => ({
  avatar:  `images/${getRandomElementFromArray([
    'bitmap.png',
    'bitmap@2x.png',
    'bitmap@3x.png',
  ])}`,
  rank: getRandomElementFromArray([
    'Movie Buff',
    'Movie Looser',
    'Movie Horror',
  ]),
});

export { generateFilmData, generateMenuData, generateSortMenuData, generateStatisticsData, generateUserDate };
