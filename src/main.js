
import {createFilterTemplate} from "../src/components/filter.js";
import {createControlsTemplate} from "../src/components/tabs.js";
import {createTripDay} from "../src/components/tripDay.js";
import {createPointsTemplate, createWrapTrip} from "../src/components/point.js";
import {createNewEventWithoutDestination} from "../src/components/createNewEventWithoutDestination.js";
import {createNewEventWithDestination} from "../src/components/createNewEventWithDestination.js";
import {createFirstEventTemplate} from "../src/components/createFirstEventTemplate.js";
import {ctreateStatTemplate} from "../src/components/ctreateStatTemplate.js";
import {createSortTemplate} from "../src/components/createSortTemplate.js";
import {createTripinfoTemplate} from "../src/components/createTripinfoTemplate.js";
import {utils} from "../src/utils.js";
import {createTripPoints, tripPointsMocks, tempRandomOffers, tempPoint} from "../src/mock/mocksData.js";
import API from "../src/api/api.js";
import Store from "../src/api/store.js";
import Provider from "../src/api/provider.js";
import PointModel from "../src/models/points.js";

const AUTHORIZATION_TOCKEN = `Basic 3u3udjnbccec333`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION_TOCKEN);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointModel = new PointModel();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);
render(siteHeaderElement, createTripinfoTemplate(), `afterbegin`);
render(siteHeaderElement, createControlsTemplate(), `beforeend`);
const filters = [`everything`, `future`, `past`];
render(siteHeaderElement, createFilterTemplate(filters), `beforeend`);
const siteEventsHeader = document.querySelector(`.trip-events`);
// render(siteEventsHeader, createSortTemplate(), `beforeend`);
render(siteEventsHeader, createWrapTrip(), `beforeend`);
// createWrapTripDays();

const siteHeaderTripDay = document.querySelector(`.trip-events__list`);

apiWithProvider.getPoints()
  .then((points) => {
    const forRender = createPointsTemplate(points);
    pointModel.getpointsAll(points);

    // console.log(siteHeaderTripDay);
    render(siteHeaderTripDay, forRender, `beforeend`);
  });


// console.log(createEventsTemplate({name: `testName`, type: `testType`, destination: {name: `testDestinationName`, description: `testDestinationDescription`}}));
// render(siteHeaderTripDay, response.getPoints(), `beforeend`);
// render(siteEventsHeader, createNewEventWithDestination(), `beforeend`);
// render(siteEventsHeader, createNewEventWithoutDestination(), `beforeend`);
