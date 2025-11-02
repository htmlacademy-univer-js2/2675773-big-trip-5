import {render, RenderPosition} from '../render.js';
import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';

export default class TripPresenter {
  init() {
    this.renderFilters();
    this.renderSort();
    this.renderEditForm();
    this.renderPoints();
    this.renderCreateForm();
  }

  renderFilters() {
    const filtersContainer = document.querySelector('.trip-controls__filters');
    const filtersView = new FiltersView();
    render(filtersView, filtersContainer, RenderPosition.BEFOREEND);
  }

  renderSort() {
    const tripEventsSection = document.querySelector('.trip-events');
    const h2 = tripEventsSection.querySelector('h2');
    const sortView = new SortView();
    render(sortView, h2, RenderPosition.AFTEREND);
  }

  renderEditForm() {
    const eventsList = document.querySelector('.trip-events__list');
    const editFormView = new EditFormView();
    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    listItem.appendChild(editFormView.getElement());
    eventsList.insertBefore(listItem, eventsList.firstChild);
  }

  renderPoints() {
    const eventsList = document.querySelector('.trip-events__list');
    for (let i = 0; i < 3; i++) {
      const pointView = new PointView();
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(pointView.getElement());
      eventsList.appendChild(listItem);
    }
  }

  renderCreateForm() {
    const eventsList = document.querySelector('.trip-events__list');
    const createFormView = new CreateFormView();
    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    listItem.appendChild(createFormView.getElement());
    eventsList.appendChild(listItem);
  }
}

