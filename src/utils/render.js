import AbstractView from '../view/abstract';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();
  return newElement.firstChild;
};

const renderView = (container, view, place = RenderPosition.BEFOREEND) => {
  if(!(view instanceof AbstractView)) {
    throw new Error('View must be instance of AbstracView');
  }
  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(view.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(view.getElement());
      break;
  }
};

export default { renderView, createElement, RenderPosition };
