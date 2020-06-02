import AbstractComponent from "./abstract-component.js";

const createPointsTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class Points extends AbstractComponent {
  getTemplate() {
    return createPointsTemplate();
  }
}
