const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();
  return newElement.firstChild;
};

const renderElement = (container, element, place = RenderPosition.BEFOREEND) => {
  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const sortBy = function (array, sortByFunction){
  const arrayCopy = [...array];

  arrayCopy.sort(
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

  return arrayCopy;
};

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

const formatDate = (runtime) => ({
  hours: Math.trunc(runtime/60),
  minutes: runtime%60,
});

export default { formatDate, createElement, renderElement, RenderPosition, sortBy, getRandomInteger, getRandomUniqArray, getRandomElementFromArray };
