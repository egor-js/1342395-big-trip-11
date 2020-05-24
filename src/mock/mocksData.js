import {utils} from "../utils.js";

const typeTripPoint = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const tripCitys = [`Amsterdam `, `Chamonix`, `Geneva`];

const descriptionTripPoint = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];


const offersByPointType = {
  "drive": [
    {
      "title": `Rent a car`,
      "price": 200
    },
    {
      "title": `Eat in car`,
      "price": 30
    },
  ],
  "bus": [
    {
      "title": `Choose meal`,
      "price": 180
    },
    {
      "title": `Upgrade to comfort class`,
      "price": 50
    },
  ],
  "flight": [
    {
      "title": `Add luggage`,
      "price": 30
    },
    {
      "title": `Switch to comfort class`,
      "price": 100
    },
    {
      "title": `Add meal`,
      "price": 15
    },
    {
      "title": `Choose seats`,
      "price": 5
    },
    {
      "title": `Travel by train`,
      "price": 40
    },
  ],
  "taxi": [
    {
      "title": `Order Uber`,
      "price": 20
    }
  ],
  "check-in": [
    {
      "title": `Add breakfast`,
      "price": 50
    }
  ],
  "sightseeing": [
    {
      "title": `Book tickets`,
      "price": 40
    },
    {
      "title": `Lunch in city`,
      "price": 30
    }
  ],
};

const destinanion = [
  {
    "description": `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
    "name": `Chamonix`,
    "pictures": [
      {
        "src": `http://picsum.photos/248/152?r=${Math.random()}`,
        "description": `Chamonix parliament building`
      }
    ]
  },
  {
    "description": `Amsterdam is a capital of the Smoking World`,
    "name": `Amsterdam`,
    "pictures": [
      {
        "src": `http://picsum.photos/248/152?r=${Math.random()}`,
        "description": `Red lighting street in Amsterdam`
      }
    ]
  },
  {
    "description": `Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland.`,
    "name": `Geneva`,
    "pictures": [
      {
        "src": `http://picsum.photos/248/152?r=${Math.random()}`,
        "description": `The Jet d'Eau is a large fountain in Geneva,`
      }
    ]
  },


];

// const point = {
//   "base_price": 1100,
//   "date_from": `2019-07-10T22:55:56.845Z`,
//   "date_to": `2019-07-11T11:22:13.375Z`,
//   "destination": destinanion,
//   "id": `0`,
//   "is_favorite": false,
//   "offers": [
//     {
//       "title": `Choose meal`,
//       "price": 180
//     }, {
//       "title": `Upgrade to comfort class`,
//       "price": 50
//     }
// ],
// "type": `bus`;


const tripPointsMocks = [];
const tempRandomOffers = [];

const createTripPoints = function () {
  for (let i = 0; i < 10; i++) {
    // const basePriceRandom = ;
    const randomType = typeTripPoint[utils.randomInt(9)];
    // tempRandomOffers[i] = randomType;// offersByPointType.bus;
    tripPointsMocks.push({
      "base_price": utils.randomInt(500, 2000),
      "destinanion": destinanion[utils.randomInt(2)],
      "id": i,
      "is_favorite": Math.random() > 0.5,
      "type": randomType,
      "offers": offersByPointType[randomType],
    });

  }
};
// typeTripPoint, tripCitys, descriptionTripPoint, offersByPointType,
export {createTripPoints, tripPointsMocks, tempRandomOffers};
