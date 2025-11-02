import EditFormView from './edit-form.js';

export default class CreateFormView extends EditFormView {
  constructor(availableOffers = [], allDestinations = []) {
    super(null, null, availableOffers, [], allDestinations);
  }
}

