import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point.js';
import EditFormView from '../view/edit-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  constructor({container, point, destination, selectedOffers, offersByType, allDestinations, onModeChange, onDataChange}) {
    this.container = container;
    this.point = point;
    this.destination = destination;
    this.selectedOffers = selectedOffers;
    this.offersByType = offersByType;
    this.allDestinations = allDestinations;
    this.onModeChange = onModeChange;
    this.onDataChange = onDataChange;

    this.mode = Mode.DEFAULT;

    this.pointView = null;
    this.editFormView = null;
  }

  init() {
    this.pointView = new PointView(this.point, this.destination, this.selectedOffers);
    this.editFormView = new EditFormView(
      this.point,
      this.destination,
      this.offersByType,
      this.point.offers || [],
      this.allDestinations
    );

    this.pointView.setRollupClickHandler(this.#handleOpenEdit);
    this.pointView.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.editFormView.setFormSubmitHandler(this.#handleFormSubmit);
    this.editFormView.setRollupClickHandler(this.#handleCloseEdit);

    render(this.pointView, this.container);
  }

  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this.#replacePoint();
    }
  }

  destroy() {
    if (this.pointView) {
      remove(this.pointView);
    }
    if (this.editFormView) {
      remove(this.editFormView);
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEdit() {
    replace(this.editFormView, this.pointView);
    this.mode = Mode.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replacePoint() {
    replace(this.pointView, this.editFormView);
    this.mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePoint();
    }
  };

  #handleOpenEdit = () => {
    this.onModeChange?.();
    this.#replaceEdit();
  };

  #handleCloseEdit = () => {
    this.#replacePoint();
  };

  #handleFormSubmit = () => {
    this.#replacePoint();
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {
      ...this.point,
      isFavorite: !this.point.isFavorite
    };
    this.onDataChange?.(updatedPoint);
  };
}


