import {render, RenderPosition} from '../render.js';
import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';

export default class TripPresenter {
  constructor(model) {
    this.model = model;
  }

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
    const points = this.model.getPoints();
    
    if (points.length > 0) {
      const point = points[0];
      const destination = this.model.getDestinationById(point.destination);
      const availableOffers = this.model.getOffersByType(point.type);
      const selectedOffersIds = point.offers || [];
      const allDestinations = this.model.getAllDestinations();
      
      const editFormView = new EditFormView(point, destination, availableOffers, selectedOffersIds, allDestinations);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(editFormView.getElement());
      eventsList.insertBefore(listItem, eventsList.firstChild);
    }
  }

  renderPoints() {
    const eventsList = document.querySelector('.trip-events__list');
    const points = this.model.getPoints();
    
    const pointsToRender = points.slice(0, 3);
    
    pointsToRender.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);
      
      const pointView = new PointView(point, destination, selectedOffers);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(pointView.getElement());
      eventsList.appendChild(listItem);
    });
  }

  renderCreateForm() {
    const eventsList = document.querySelector('.trip-events__list');
    const defaultOffers = this.model.getOffersByType('flight');
    const allDestinations = this.model.getAllDestinations();
    const createFormView = new CreateFormView(defaultOffers, allDestinations);
    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    listItem.appendChild(createFormView.getElement());
    eventsList.appendChild(listItem);
  }
}

