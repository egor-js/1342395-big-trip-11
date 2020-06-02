import AbstractComponent from "./abstract-component.js";
import {formatTime, formatDate, durationTime, isOneDay} from "../utils/common.js";
// import {isOverdueDate} from "../utils/common.js";
// import {encode} from "he";

const createPointTemplate = (point) => {

  // const date = formatDate(point.date_from);
  const timeFrom = formatTime(point.date_from);
  const timeTo = formatTime(point.date_to);
  const pointPrice = point.offers.reduce((acc, offer) => {
    return acc + offer.price;
  }, point.base_price);
  const offers = point.offers.map((offer) => (
    `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
     </li>
     `)
  ).join(`\n`);

  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} to ${point.destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
          </p>
          <p class="event__duration">${point.date_from}</p>
          <p class="event__duration">${point.date_to}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `
  );
};

export default class Point extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  // setFavoritesButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.event__favorite-btn`)
  //     .addEventListener(`click`, handler);
  // }
}
