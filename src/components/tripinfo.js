import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};

export {createTripInfoTemplate};

export default class TripInfo extends AbstractComponent {
  constructor() {
    super();
    this._element = this.getElement();
  }

  getTemplate() {
    return createTripInfoTemplate();
  }

}

//       <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
//     </div>
//
//   <div class="trip-main">
//   <section class="trip-main__trip-info  trip-info">
//     <div class="trip-info__main">
//       <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
//
//       <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
//     </div>
//
//     <p class="trip-info__cost">
//       Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
//     </p>
//   </section>
//
//   <div class="trip-main__trip-controls  trip-controls">
//     <h2 class="visually-hidden">Switch trip view</h2>
//     <nav class="trip-controls__trip-tabs  trip-tabs">
//       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
//       <a class="trip-tabs__btn" href="#">Stats</a>
//     </nav>
//
