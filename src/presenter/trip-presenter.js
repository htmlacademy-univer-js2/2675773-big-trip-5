import {render, RenderPosition, replace} from '../framework/render.js';
import FiltersView from '../view/filters.js';
import SortView from '../view/sort.js';
import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import EmptyView from '../view/empty.js';

export default class TripPresenter {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.renderFilters();
    this.renderSort();

    const points = this.model.getPoints();
    if (points.length === 0) {
      this.renderEmpty();
      return;
    }

    this.renderPoints();
    this.renderCreateForm();
  }

  renderFilters() {
    const filtersContainer = document.querySelector('.trip-controls__filters');
    const points = this.model.getPoints();
    const now = new Date();
    const hasFuture = points.some((p) => new Date(p.dateFrom) > now);
    const hasPresent = points.some((p) => new Date(p.dateFrom) <= now && now <= new Date(p.dateTo));
    const hasPast = points.some((p) => new Date(p.dateTo) < now);

    const filtersView = new FiltersView({hasFuture, hasPresent, hasPast});
    render(filtersView, filtersContainer, RenderPosition.BEFOREEND);
  }

  renderSort() {
    const tripEventsSection = document.querySelector('.trip-events');
    const h2 = tripEventsSection.querySelector('h2');
    const sortView = new SortView();
    render(sortView, h2, RenderPosition.AFTEREND);
  }

  renderEmpty() {
    const tripEventsSection = document.querySelector('.trip-events');
    const h2 = tripEventsSection.querySelector('h2');
    const emptyView = new EmptyView();
    render(emptyView, h2, RenderPosition.AFTEREND);
  }

  // Больше не рендерим форму редактирования сразу

  renderPoints() {
    const eventsList = document.querySelector('.trip-events__list');
    const points = this.model.getPoints();
    
    const pointsToRender = points.slice(0, 3);
    
    pointsToRender.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);

      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      eventsList.appendChild(listItem);

      const pointView = new PointView(point, destination, selectedOffers);
      listItem.appendChild(pointView.element);

      const availableOffers = this.model.getOffersByType(point.type);
      const selectedOffersIds = point.offers || [];
      const allDestinations = this.model.getAllDestinations();
      const editFormView = new EditFormView(point, destination, availableOffers, selectedOffersIds, allDestinations);

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          replace(pointView, editFormView);
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      pointView.setRollupClickHandler(() => {
        replace(editFormView, pointView);
        document.addEventListener('keydown', onEscKeyDown);
      });

      editFormView.setFormSubmitHandler(() => {
        replace(pointView, editFormView);
        document.removeEventListener('keydown', onEscKeyDown);
      });

      editFormView.setRollupClickHandler(() => {
        replace(pointView, editFormView);
        document.removeEventListener('keydown', onEscKeyDown);
      });
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

