import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyView extends AbstractView {
  constructor(message = 'Click New Event to create your first point') {
    super();
    this.message = message;
  }

  get template() {
    return `
      <p class="trip-events__msg">${this.message}</p>
    `;
  }
}


