import {createElement} from '../render.js';

export default class View {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  getElement() {
    return this.element;
  }

  removeElement() {
    this.#element = null;
  }
}

