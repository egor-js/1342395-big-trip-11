export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
  }

  getDistinationsByName(name) {
    const forReturn = this._destinations.find((item) => {
      return item.name === name;
    });
    return forReturn;
  }
}
