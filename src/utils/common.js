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
  const uniqArray = new Set();
  while(uniqArray.size < numberOfElements){
    uniqArray.add(data[getRandomInteger(0, data.length - 1)]);
  }
  return Array.from(uniqArray);
};

const getRandomElementFromArray = (data) => data[getRandomInteger(0, data.length - 1)];

const formatDate = (runtime) => ({
  hours: Math.trunc(runtime/60),
  minutes: runtime%60,
});

export default { formatDate, sortBy, getRandomInteger, getRandomUniqArray, getRandomElementFromArray };
