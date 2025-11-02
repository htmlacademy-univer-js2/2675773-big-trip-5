import View from './view.js';
import {formatDate, formatTime, calculateDuration} from '../utils/date.js';

export default class PointView extends View {
  constructor(point, destination, selectedOffers) {
    super();
    this.point = point;
    this.destination = destination;
    this.selectedOffers = selectedOffers;
  }

  get template() {
    const dateFormatted = formatDate(this.point.dateFrom);
    const dateISO = this.point.dateFrom.split('T')[0];
    const startTime = formatTime(this.point.dateFrom);
    const endTime = formatTime(this.point.dateTo);
    const startTimeISO = this.point.dateFrom;
    const endTimeISO = this.point.dateTo;
    const duration = calculateDuration(this.point.dateFrom, this.point.dateTo);
    const title = `${this.point.type.charAt(0).toUpperCase() + this.point.type.slice(1)} ${this.destination?.name || ''}`;
    const favoriteClass = this.point.isFavorite ? 'event__favorite-btn--active' : '';

    const offersHTML = this.selectedOffers.length > 0
      ? `
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this.selectedOffers.map((offer) => `
            <li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>
          `).join('')}
        </ul>
      `
      : '';

    return `
      <div class="event">
        <time class="event__date" datetime="${dateISO}">${dateFormatted}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this.point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTimeISO}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTimeISO}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this.point.basePrice}</span>
        </p>
        ${offersHTML}
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }
}

