import AbstractComponent from "./abstract-component.js";


const createPageTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class Page extends AbstractComponent {
  getTemplate() {
    return createPageTemplate();
  }
}
