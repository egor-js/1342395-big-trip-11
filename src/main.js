
const createWrapTripDays = () => {
  return (
    `
    <ul class="trip-days">

    </ul>`
  );
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

// render(siteEventsHeader, createFirstEventTemplate(), `beforeend`);
// render(siteEventsHeader, createNewEventWithDestination(), `beforeend`);
// render(siteEventsHeader, createNewEventWithoutDestination(), `beforeend`);
