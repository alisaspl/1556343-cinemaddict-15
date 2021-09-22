import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const sortBy = function (data, sortByFunction){
  const dataToSort = [...data];

  dataToSort.sort(
    (a, b) => {
      if (sortByFunction(a) < sortByFunction(b)) {
        return 1;
      }
      if (sortByFunction(a) > sortByFunction(b)) {
        return -1;
      }
      return 0;
    },
  );

  return dataToSort;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomUniqArray = (data) => {
  const numberOfElements = getRandomInteger(1, data.length - 1);
  const uniqData = new Set();
  while(uniqData.size < numberOfElements){
    uniqData.add(data[getRandomInteger(0, data.length - 1)]);
  }
  return Array.from(uniqData);
};

const getRandomElementFromArray = (data) => data[getRandomInteger(0, data.length - 1)];

const formatTime = (runtime) => {
  const hours = Math.trunc(dayjs.duration({ minutes: runtime }).asHours());
  let time = '';

  if(hours > 0) {
    time += `${hours}h `;
    runtime -= hours*60;
  }
  if(runtime !== 0) {
    time += `${runtime}m`;
  }

  if(time === '') {
    time = '0m';
  }

  return time;
};

const formatDate = (releaseDate) => dayjs(releaseDate, 'YYYY-MM-DD').format('DD MMMM YYYY');

export const isOnline = () => window.navigator.onLine;

export default { formatTime, formatDate, sortBy, getRandomInteger, getRandomUniqArray, getRandomElementFromArray, isOnline };
