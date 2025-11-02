import {POINTS, DESTINATIONS, OFFERS_BY_TYPE} from './mock/mock-data.js';

export default class TripModel {
  constructor() {
    this.points = POINTS;
    this.destinations = DESTINATIONS;
    this.offersByType = OFFERS_BY_TYPE;
  }

  getPoints() {
    return this.points;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    return this.offersByType[type] || [];
  }

  getSelectedOffers(point) {
    if (!point.offers || point.offers.length === 0) {
      return [];
    }
    const offers = this.getOffersByType(point.type);
    return offers.filter((offer) => point.offers.includes(offer.id));
  }

  getAllDestinations() {
    return this.destinations;
  }
}

