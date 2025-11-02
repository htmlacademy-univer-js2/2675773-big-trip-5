export default class Point {
  constructor(data) {
    this.id = data.id;
    this.basePrice = data.basePrice;
    this.dateFrom = data.dateFrom;
    this.dateTo = data.dateTo;
    this.destination = data.destination;
    this.isFavorite = data.isFavorite;
    this.offers = data.offers;
    this.type = data.type;
  }
}

