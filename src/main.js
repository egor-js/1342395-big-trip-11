
const createWrapTripDays = () => {
  return (`<ul class= trip-days> </ul>`);
};

import {createFilterTemplate} from "../src/components/filter.js";
import {createControlsTemplate} from "../src/components/tabs.js";
import {createTripDay} from "../src/components/tripDay.js";
import {createEventTemplate} from "../src/components/event.js";
import {createNewEventWithoutDestination} from "../src/components/createNewEventWithoutDestination.js";
import {createNewEventWithDestination} from "../src/components/createNewEventWithDestination.js";
import {createFirstEventTemplate} from "../src/components/createFirstEventTemplate.js";
import {ctreateStatTemplate} from "../src/components/ctreateStatTemplate.js";
import {createSortTemplate} from "../src/components/createSortTemplate.js";
import {createTripinfoTemplate} from "../src/components/createTripinfoTemplate.js";
// import {utils} from "../src/utils.js";
import {createTripPoints, tripPointsMocks, tempRandomOffers} from "../src/mock/mocksData.js";

const offer = {
  "type": `taxi`,
  "offers": [
    {
      "title": `Upgrade to a business class`,
      "price": 120
    }, {
      "title": `Choose the radio station`,
      "price": 60
    }
  ]
};

const point = {
  "base_price": 1100,
  "date_from": `2019-07-10T22:55:56.845Z`,
  "date_to": `2019-07-11T11:22:13.375Z`,
//  "destination": destinanion,
  "id": `0`,
  "is_favorite": false,
  "offers": [
    {
      "title": `Choose meal`,
      "price": 180
    }, {
      "title": `Upgrade to comfort class`,
      "price": 50
    }
  ],
  "type": `bus`
};

createTripPoints();

// console.log(`Destination is`, typeof destinanion, `:\n`, destinanion, `\n`);
// console.log(`Offer is`, typeof offer, `:\n `, offer, `\n`);
// console.log(`Point is`, typeof point, `:\n `, point, `\n`);
console.log(`tripPointsMocks is`, typeof tripPointsMocks, `:\n `, tripPointsMocks, `\n`);

// console.log(tempRandomOffers);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);

render(siteHeaderElement, createTripinfoTemplate(), `afterbegin`);

render(siteHeaderElement, createControlsTemplate(), `beforeend`);

render(siteHeaderElement, createFilterTemplate(), `beforeend`);

const siteEventsHeader = document.querySelector(`.trip-events`);

render(siteEventsHeader, createSortTemplate(), `beforeend`);

render(siteEventsHeader, createWrapTripDays(), `beforeend`);

const siteHeaderTripDay = document.querySelector(`.trip-days`);

render(siteHeaderTripDay, createTripDay(), `beforeend`);

render(siteEventsHeader, createEventTemplate(), `beforeend`);
// render(siteEventsHeader, createNewEventWithDestination(), `beforeend`);
// render(siteEventsHeader, createNewEventWithoutDestination(), `beforeend`);
