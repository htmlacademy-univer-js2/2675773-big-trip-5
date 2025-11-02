import TripPresenter from './presenter/trip-presenter.js';

const presenter = new TripPresenter();

document.addEventListener('DOMContentLoaded', () => {
  presenter.init();
});

