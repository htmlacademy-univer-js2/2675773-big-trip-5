import {render, RenderPosition} from '../framework/render.js';
import FiltersView from '../view/filters.js';
import SortView, {SortType} from '../view/sort.js';
import CreateFormView from '../view/create-form.js';
import EmptyView from '../view/empty.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  constructor(model) {
    this.model = model;
    this.pointPresenters = [];
    this.currentSortType = SortType.DAY;
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
    this.sortView = new SortView(this.currentSortType);
    this.sortView.setSortTypeChangeHandler((sortType) => this.handleSortTypeChange(sortType));
    render(this.sortView, h2, RenderPosition.AFTEREND);
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
    const pointsToRender = this.getSortedPoints();
    
    this.pointPresenters = pointsToRender.map((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      eventsList.appendChild(listItem);

      const presenter = new PointPresenter({
        container: listItem,
        point,
        destination,
        selectedOffers,
        offersByType: this.model.getOffersByType(point.type),
        allDestinations: this.model.getAllDestinations(),
        getOffersByType: (type) => this.model.getOffersByType(type),
        onModeChange: () => this.resetAllPointViews(),
        onDataChange: (updatedPoint) => this.updatePoint(updatedPoint)
      });
      presenter.init();
      return presenter;
    });
  }

  resetAllPointViews() {
    this.pointPresenters.forEach((p) => p.resetView());
  }

  updatePoint(updatedPoint) {
    this.model.updatePoint(updatedPoint);
    const presenter = this.pointPresenters.find((p) => p.point.id === updatedPoint.id);
    if (!presenter) {
      return;
    }
    // Обновляем данные презентера и перерисовываем
    presenter.point = updatedPoint;
    presenter.selectedOffers = this.model.getSelectedOffers(updatedPoint);
    presenter.offersByType = this.model.getOffersByType(updatedPoint.type);
    presenter.resetView();
    // Полное переинициализирование представлений
    presenter.init();
  }

  handleSortTypeChange(sortType) {
    if (this.currentSortType === sortType) {
      return;
    }
    this.currentSortType = sortType;
    this.clearPoints();
    this.renderPoints();
  }

  getSortedPoints() {
    const points = this.model.getPoints().slice(0, 3);
    if (this.currentSortType === SortType.TIME) {
      return points.sort((a, b) => (new Date(b.dateTo) - new Date(b.dateFrom)) - (new Date(a.dateTo) - new Date(a.dateFrom)));
    }
    if (this.currentSortType === SortType.PRICE) {
      return points.sort((a, b) => b.basePrice - a.basePrice);
    }
    // SortType.DAY (по возрастанию даты начала)
    return points.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  }

  clearPoints() {
    this.pointPresenters.forEach((p) => p.destroy());
    this.pointPresenters = [];
    const eventsList = document.querySelector('.trip-events__list');
    if (eventsList) {
      eventsList.innerHTML = '';
    }
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

