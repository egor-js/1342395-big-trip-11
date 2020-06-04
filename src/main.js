// import {createSortTemplate} from "../src/components/createSortTemplate.js";
// import {createControlsTemplate} from "../src/components/controls.js";
// import {createTripDay} from "../src/components/tripDay.js";
// import {createNewPoint} from "../src/components/create-new-point-without-destination.js";
import API from "../src/api/api.js";
import Provider from "../src/api/provider.js";
import Store from "../src/api/store.js";

import FilterController from "./controllers/filter.js";
import PageController from "./controllers/page.js";
// import OffersModel from "../src/models/offers.js";
// import DestinationsModel from "../src/models/destinations.js";
import PageComponent from "./components/page.js";
import TripInfo from "./components/tripinfo.js";
import StatisticsComponent from "./components/statistics.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import PointsModel from "./models/points.js";
import {render, RenderPosition} from "./utils/render.js";


const AUTHORIZATION_TOCKEN = `Basic 3u3udjnbccec333`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

// const destinationsModel = new DestinationsModel();
// const offersModel = new OffersModel();

const dateNow = new Date();
const dateFrom = (() => {
  const d = new Date(dateNow);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION_TOCKEN);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const pointsModel = new PointsModel();

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = document.querySelector(`.trip-main__trip-controls`);
const siteTripEvents = document.querySelector(`.trip-events`);

const tripinfo = new TripInfo();
render(siteMainElement, tripinfo, RenderPosition.AFTERBEGIN);

const filterController = new FilterController(siteControlsElement, pointsModel);

const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({points: pointsModel, dateFrom, dateNow});

const pageComponent = new PageComponent();
const pageController = new PageController(pageComponent, pointsModel, apiWithProvider);
console.log(pageController);

render(siteControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteTripEvents, pageComponent, RenderPosition.BEFOREEND);
render(siteTripEvents, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    // case MenuItem.NEW_TASK:
    //   siteMenuComponent.setActiveItem(MenuItem.TASKS);
    //   statisticsComponent.hide();
    //   pageController.show();
    //   pageController.createTask();
    //   break;
    case MenuItem.STATISTICS:
      pageController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      pageController.show();
      break;
  }
});

filterController.render();

apiWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    pageController.render();
  });


// apiWithProvider.getOffers()
//     .then((offers) => {
//       // console.log(offersModel);
//       offersModel.setOffers(offers);
//       // console.log(offersModel.getOffersByType(`taxi`));
//       // const forRender = createPointsTemplate(points);
//       // pointModel.getpointsAll(points);
//       // render(siteHeaderTripDay, forRender, `beforeend`);
//     });
//
// apiWithProvider.getDestinations()
// .then((destinations) => {
//   // console.log(offersModel);
//   destinationsModel.setDestinations(destinations);
//   // console.log(destinationsModel.getDistinationsByName(`Moscow`));
//   // const forRender = createPointsTemplate(points);
//   // pointModel.getpointsAll(points);
// render(siteHeaderTripDay, forRender, `beforeend`);
// });

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`)
//         .then(() => {
//           // Действие, в случае успешной регистрации ServiceWorker
//         }).catch(() => {
//           // Действие, в случае ошибки при регистрации ServiceWorker
//         });
// });
// //
window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

// const wrapSection = document.querySelector(`section.trip-events`);
// const addButton = document.querySelector(`.trip-main__event-add-btn`);
//
// addButton.addEventListener(`click`, () => {
//   const newPointTemp = createNewPoint();
//   addButton.setAttribute(`disabled`, ``);
//   render(wrapSection, newPointTemp, `afterbegin`);
//   wrapSection.querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
//     addButton.removeAttribute(`disabled`, ``);
//     wrapSection.removeChild(wrapSection.children[0]);
//   });
// });

// console.log(createEventsTemplate({name: `testName`, type: `testType`, destination: {name: `testDestinationName`, description: `testDestinationDescription`}}));
// render(siteHeaderTripDay, response.getPoints(), `beforeend`);
// render(siteEventsHeader, createNewEventWithDestination(), `beforeend`);
// render(siteEventsHeader, createNewEventWithoutDestination(), `beforeend`);
