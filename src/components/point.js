import AbstractComponent from "./abstract-component.js";
import {formatTime, formatDate, durationTime, isOneDay} from "../utils/common.js";
// import {isOverdueDate} from "../utils/common.js";
import {encode} from "he";


const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};

// Функцию для генерации HTML-разметки можно превратить в метод класса,
// однако делать мы этого не будем, потому что это не критично,
// а функция у нас уже была описана
const createPointTemplate = (point) => {

  const date = formatDate(point.date_from);
  const timeFrom = formatTime(point.date_from);
  const timeTo = formatTime(point.date_to);
  const from = durationTime(point.date_from);
  const to = durationTime(point.date_to);
  const duration = isOneDay(point.date_to, point.date_from);
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


  // const {destinanion: name, notSanitizedDescription} = point;
  //
  // // const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  // // const isDateShowing = !!dueDate;
  //
  // // const date = isDateShowing ? formatDate(dueDate) : ``;
  // // const time = isDateShowing ? formatTime(dueDate) : ``;
  // const description = encode(notSanitizedDescription);
  //
  // const editButton = createButtonMarkup(`edit`);
  // const favoritesButton = createButtonMarkup(`favorites`, !point.isFavorite);
  //
  // // const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  // // const deadlineClass = isExpired ? `card--deadline` : ``;

  // return createPointMarkup(point);

  //  (
  //   `
  //   <article class="card card--${color} \${repeatClass} \${deadlineClass}">
  //     <div class="card__form">
  //       <div class="card__inner">
  //         <div class="card__control">
  //           ${editButton}
  //           ${favoritesButton}
  //         </div>
  //
  //       <div class="card__color-bar">
  //         <svg class="card__color-bar-wave" width="100%" height="10">
  //           <use xlink:href="#wave"></use>
  //         </svg>
  //       </div>
  //
  //       <div class="card__textarea-wrap">
  //         <p class="card__text">${description}</p>
  //       </div>
  //
  //       <div class="card__settings">
  //         <div class="card__details">
  //           <div class="card__dates">
  //             <div class="card__date-deadline">
  //               <p class="card__input-deadline-wrap">
  //                 <span class="card__date">\${date}</span>
  //                 <span class="card__time">\${time}</span>
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </article>`);
};

export default class Point extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  // setEditButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.event__rollup-btn`)
  //     .addEventListener(`click`, handler);
  // }
  //
  // setFavoritesButtonClickHandler(handler) {
  //   this.getElement().querySelector(`.event__favorite-btn`)
  //     .addEventListener(`click`, handler);
  // }
}


const createWrapTrip = () => {
  return (
    `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>

    <ul class="trip-days">
      <li class="trip-days__item day">

        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime="2019-03-18">MAR 18</time>
        </div>
        <ul class="trip-events__list">

        </ul>
      </li>
    </ul>
    `
  );
};


const createPointMarkup = (point) => {

  const date = formatDate(point.date_from);
  const timeFrom = formatTime(point.date_from);
  const timeTo = formatTime(point.date_to);
  const from = durationTime(point.date_from);
  const to = durationTime(point.date_to);
  const duration = isOneDay(point.date_to, point.date_from);
  const pointPrice = point.offers.reduce((acc, offer) => {
    return acc + offer.price;
  }, point.base_price);
  const offers = point.offers.map((offer) => (
    `
    <li hidden class="event__offer">
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

// const createFilterMarkup = (name, isChecked) => {
//   return (
//     `
//     <div class="trip-filters__filter">
//       <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${name} ${isChecked ? `checked` : ``} >
//       <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
//     </div>`
//   );
// };

const getOffersBypointType = (offers) => {
  // console.log(offers);
};

// const createPointsTemplate = (points) => {
//   // console.log(points);
//   const pointsMarkup = points.map((it) => (createPointMarkup(it))).join(`\n`);
//   return (
//     `
//     ${pointsMarkup}`
//   );
// };

// export {getOffersBypointType, createWrapTrip};
