import AbstractComponent from "./abstract-component.js";


const createNoPointsTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};


export default class NoPoints extends AbstractComponent {
  getTemplate() {
    return createNoPointsTemplate();
  }
}
