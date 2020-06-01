export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.destination = data[`destination`] || ``;
    this.offers = data[`offers`] || ``;
    this.dateFrom = data[`date_from`]; // ? new Date(data[`due_date`]) : null;
    this.dateTo = data[`date_to`]; // ? new Date(data[`due_date`]) : null;
    this.type = data[`type`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.basePrice = data[`base_price`];
  }

  toRAW() {
    console.log(`privert from ${this}  toRAW`);
    return {
      "id": this.id,
      "destination": this.destination,
      // "due_date": this.dueDate ? this.dueDate.toISOString() : null,
      // "repeating_days": this.repeatingDays,
      // "color": this.color,
      "type": this.type,
      "is_favorite": this.isFavorite,
      // "is_archived": this.isArchive,
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
