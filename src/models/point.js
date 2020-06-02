export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.destination = data[`destination`] || ``;
    this.offers = data[`offers`] || ``;
    this.dateFrom = data[`date_from`];
    this.dateTo = data[`date_to`];
    this.type = data[`type`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.basePrice = data[`base_price`];
  }

  toRAW() {
    return {
      "id": this.id,
      "destination": this.destination,
      "offers": this.offers,
      "date_from": this.dateFrom,
      "date_to": this.dateTo,
      "type": this.type,
      "is_favorite": this.isFavorite,
      "base_price": this.basePrice,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
