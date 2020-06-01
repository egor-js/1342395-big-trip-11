import AbstractComponent from "./abstract-component.js";


const createPageTemplate = () => {
  return (
    `<section class="trip-events"></section>`
  );
};


export default class Page extends AbstractComponent {
  getTemplate() {
    return createPageTemplate();
  }
}
