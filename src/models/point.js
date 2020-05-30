export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.destination.description = data[`destinanion`][`description`] || ``;
    this.destination.name = data[`destinanion`][`name`] || ``;
    // this.destination.pictures = data[`destinanion`][`pictures`] || ``;
    this.dateFrom = data[`date_from`]; // ? new Date(data[`due_date`]) : null;
    this.type = data[`type`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.basePrice = data[`base_price`];
  }

  toRAW() {
    return {
      "id": this.id,
      "description": this.description,
      "due_date": this.dueDate ? this.dueDate.toISOString() : null,
      "repeating_days": this.repeatingDays,
      "color": this.color,
      "is_favorite": this.isFavorite,
      "is_archived": this.isArchive,
    };
  }

  static parseTask(data) {
    return new Point(data);
  }

  static parseTasks(data) {
    return data.map(Point.parseTask);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
