import AbstractView from '../framework/view/abstract-view.js';

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export default class SortView extends AbstractView {
  constructor(currentSortType = SortType.DAY) {
    super();
    this.currentSortType = currentSortType;
  }

  get template() {
    const isChecked = (type) => this.currentSortType === type ? 'checked' : '';
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--day">
          <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="day" data-sort-type="day" ${isChecked('day')}>
          <label class="trip-sort__btn" for="sort-day" data-sort-type="day">Day</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="event" disabled>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="time" data-sort-type="time" ${isChecked('time')}>
          <label class="trip-sort__btn" for="sort-time" data-sort-type="time">Time</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="price" data-sort-type="price" ${isChecked('price')}>
          <label class="trip-sort__btn" for="sort-price" data-sort-type="price">Price</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--offer">
          <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="offer" disabled>
          <label class="trip-sort__btn" for="sort-offer">Offers</label>
        </div>
      </form>
    `;
  }

  setSortTypeChangeHandler(handler) {
    this.element.addEventListener('click', (evt) => {
      const target = evt.target;
      const sortType = target.dataset.sortType;
      if (!sortType) {
        return;
      }
      handler(sortType);
    });
  }
}

