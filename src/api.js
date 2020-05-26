const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getPoints() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
    // .then(Task.parseTasks);
  }
  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }
  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }
//   updateTask(id, data) {
//     const headers = new Headers();
//     headers.append(`Authorization`, this._authorization);
//     headers.append(`Content-Type`, `application/json`);
//
//     return fetch(`https://11.ecmascript.pages.academy/task-manager/tasks/${id}`, {
//       method: `PUT`,
//       body: JSON.stringify(data.toRAW()),
//       headers,
//     })
//       .then(checkStatus)
//       .then((response) => response.json())
// //    .then(Task.parseTask);
//   }
};

export {API};
