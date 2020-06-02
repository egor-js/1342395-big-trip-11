export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }

  getOffersByType(type) {
    const forReturn = this._offers.find((item) => item.type === type);
    return forReturn.offers;
  }

}
