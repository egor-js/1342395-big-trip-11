
// import {utils} from "../src/utils.js";
// import {createTripDay} from "../src/components/tripDay.js";
// import {createPointsTemplate, createWrapTrip} from "../src/components/point.js";
// import {createNewEventWithDestination} from "../src/components/createNewEventWithDestination.js";
// import {createFirstEventTemplate} from "../src/components/createFirstEventTemplate.js";
// import {ctreateStatTemplate} from "../src/components/ctreateStatTemplate.js";
// import {createSortTemplate} from "../src/components/createSortTemplate.js";
// import {createTripPoints, tripPointsMocks, tempRandomOffers, tempPoint} from "../src/mock/mocksData.js";

import {createSortTemplate} from "../src/components/createSortTemplate.js";
import {createControlsTemplate} from "../src/components/controls.js";
import {createTripinfoTemplate} from "../src/components/createTripinfoTemplate.js";
import {createTripDay} from "../src/components/tripDay.js";
import {createNewPoint} from "../src/components/create-new-point-without-destination.js";
import API from "../src/api/api.js";
import FilterController from "./controllers/filter.js";
import Provider from "../src/api/provider.js";
import PointsModel from "../src/models/points.js";
import PageController from "./controllers/page.js";
import PageComponent from "./components/page.js";
import Store from "../src/api/store.js";
import {render, RenderPosition} from "./utils/render.js";

const AUTHORIZATION_TOCKEN = `Basic 3u3udjnbccec333`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION_TOCKEN);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new PointsModel();

const pageComponent = new PageComponent();
const pageController = new PageController(pageComponent, pointsModel, apiWithProvider);

const renderOLD = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);

// const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);
const siteTripEvents = document.querySelector(`.trip-events`);
// const filters = [`everything`, `future`, `past`];

const siteControlTabs = document.querySelector(`.trip-main__trip-controls.trip-controls`);
console.log(siteControlTabs);
renderOLD(siteMainElement, createTripinfoTemplate(), `afterbegin`);
renderOLD(siteControlTabs, createControlsTemplate(), `beforeend`);
renderOLD(siteTripEvents, createSortTemplate(), `beforeend`);
renderOLD(siteTripEvents, createTripDay(), `beforeend`);


const filterController = new FilterController(siteControlTabs, pointsModel);

filterController.render();
// renderOLD(siteHeaderElement, createFilterTemplate(filters), `beforeend`);
// const siteEventsHeader = document.querySelector(`.trip-events`);
// console.log(pageComponent);
render(siteTripEvents, pageComponent, RenderPosition.BEFOREEND);

// render(siteEventsHeader, createSortTemplate(), `beforeend`);
// createWrapTripDays();

// const siteHeaderTripDay = document.querySelector(`.trip-events__list`);

apiWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    console.log(pointsModel);
    pageController.render();
    console.log(pageController);
  });

apiWithProvider.getOffers()
    .then((offers) => {
      // console.log(offers);
      // const forRender = createPointsTemplate(points);
      // pointModel.getpointsAll(points);
      // render(siteHeaderTripDay, forRender, `beforeend`);
    });

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`)
//         .then(() => {
//           // Действие, в случае успешной регистрации ServiceWorker
//         }).catch(() => {
//           // Действие, в случае ошибки при регистрации ServiceWorker
//         });
// });
//
// window.addEventListener(`online`, () => {
//   document.title = document.title.replace(` [offline]`, ``);
//   apiWithProvider.sync();
// });
//
// window.addEventListener(`offline`, () => {
//   document.title += ` [offline]`;
// });

const wrapSection = document.querySelector(`section.trip-events`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);

addButton.addEventListener(`click`, () => {
  const newPointTemp = createNewPoint();
  addButton.setAttribute(`disabled`, ``);
  renderOLD(wrapSection, newPointTemp, `afterbegin`);
  wrapSection.querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    addButton.removeAttribute(`disabled`, ``);
    wrapSection.removeChild(wrapSection.children[0]);
  });
});

// console.log(createEventsTemplate({name: `testName`, type: `testType`, destination: {name: `testDestinationName`, description: `testDestinationDescription`}}));
// render(siteHeaderTripDay, response.getPoints(), `beforeend`);
// render(siteEventsHeader, createNewEventWithDestination(), `beforeend`);
// render(siteEventsHeader, createNewEventWithoutDestination(), `beforeend`);
