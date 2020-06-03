import Point from "../models/point.js";
// import Offers from "../src/models/offers.js";
// import Destinations from "../src/models/Destinations.js";


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json()); // !!!!!!!!!!!!!!!!
    // .then(Task.parseTasks);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json()); // !!!!!!!!!!!!!!!!
    // .then(Task.parseTasks);
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json()) // !!!!!!!!!!!!!!!!
      .then(Point.parsePoints);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json()); // !!!!!!!!!!!!!!!!
    // .then(Task.parseTask);
  }

  updateTask(id, data) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
    // .then(Task.parseTask);  // !!!!!!!!!!!!!!!!!!!!!!!
  }

  deleteTask(id) {
    return this._load({url: `tasks/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `tasks/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;