import View from './view.js';
import {formatDateForInput} from '../utils/date.js';
import {POINT_TYPES} from '../model/mock/point-mock.js';

export default class EditFormView extends View {
  constructor(point = null, destination = null, availableOffers = [], selectedOffersIds = [], allDestinations = []) {
    super();
    this.point = point;
    this.destination = destination;
    this.availableOffers = availableOffers;
    this.selectedOffersIds = selectedOffersIds;
    this.allDestinations = allDestinations;
  }

  get template() {
    const pointType = this.point?.type || 'flight';
    const destinationName = this.destination?.name || '';
    const startTime = this.point ? formatDateForInput(this.point.dateFrom) : '';
    const endTime = this.point ? formatDateForInput(this.point.dateTo) : '';
    const price = this.point?.basePrice || '';
    const description = this.destination?.description || '';
    const pictures = this.destination?.pictures || [];

    const typeOptionsHTML = POINT_TYPES.map((type) => {
      const checked = type === pointType ? 'checked' : '';
      const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
      return `
        <div class="event__type-item">
          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalized}</label>
        </div>
      `;
    }).join('');

    const destinationOptionsHTML = this.allDestinations.length > 0
      ? this.allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')
      : `
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      `;

    const offersHTML = this.availableOffers.length > 0 ? `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${this.availableOffers.map((offer, index) => {
            const checked = this.selectedOffersIds.includes(offer.id) ? 'checked' : '';
            return `
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}-1" type="checkbox" name="event-offer-${offer.id}" ${checked}>
                <label class="event__offer-label" for="event-offer-${index}-1">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    ` : '';

    const destinationSectionHTML = description ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${pictures.length > 0 ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map((picture) => `
                <img class="event__photo" src="${picture.src}" alt="${picture.description}">
              `).join('')}
            </div>
          </div>
        ` : ''}
      </section>
    ` : '';

    const typeCapitalized = pointType.charAt(0).toUpperCase() + pointType.slice(1);

    return `
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeOptionsHTML}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${typeCapitalized}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptionsHTML}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${this.point ? 'Delete' : 'Cancel'}</button>
          ${this.point ? `
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          ` : ''}
        </header>
        ${offersHTML || destinationSectionHTML ? `
          <section class="event__details">
            ${offersHTML}
            ${destinationSectionHTML}
          </section>
        ` : ''}
      </form>
    `;
  }
}
