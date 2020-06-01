// import LoadMoreButtonComponent from "../components/load-more-button.js";
// import NoTasksComponent from "../components/no-tasks.js";
// import SortComponent, {SortType} from "../components/sort.js";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "../controllers/point.js";
import PointsComponent from "../components/points.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderPoints = (pointListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointListElement, onDataChange, onViewChange);
    pointController.render(point, PointControllerMode.DEFAULT);
    console.log(pointController);
    return pointController;
  });
};

// const getSortedTasks = (tasks, sortType, from, to) => {
//   let sortedTasks = [];
//   const showingTasks = tasks.slice();
//
//   switch (sortType) {
//     case SortType.DATE_UP:
//       sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
//       break;
//     case SortType.DATE_DOWN:
//       sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
//       break;
//     case SortType.DEFAULT:
//       sortedTasks = showingTasks;
//       break;
//   }
//
//   return sortedTasks.slice(from, to);
// };


export default class PageController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._showedPointControllers = [];
    this._showingPointsCount = SHOWING_TASKS_COUNT_ON_START;
    // this._noTasksComponent = new NoTasksComponent();
    // this._sortComponent = new SortComponent();
    this._pointsComponent = new PointsComponent();
    // this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    // this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    // this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    // this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const container = this._container.getElement();
    const points = this._pointsModel.getPoints();
    // console.log(container);
    // console.log(points);
    // console.log(this._pointsComponent);
    // const isAllTasksArchived = tasks.every((task) => task.isArchive);
    //
    // if (isAllTasksArchived) {
    //   render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // console.log(this._pointsComponent.getElement());
    render(container, this._pointsComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points); // .slice(0, this._showingPointsCount));

    // this._renderLoadMoreButton();
  }

  _renderPoints(points) {
    const pointListElement = this._pointsComponent.getElement();
    const newPoint = renderPoints(pointListElement, points, this._onDataChange, this._onViewChange);
    // console.log(newPoint);
    this._showedPointControllers = this._showedPointControllers.concat(newPoint);
    this._showingPointCount = this._showedPointControllers.length;
  }
  // createTask() {
  //   if (this._creatingTask) {
  //     return;
  //   }
  //
  //   const taskListElement = this._tasksComponent.getElement();
  //   this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
  //   this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  // }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }


  // _renderLoadMoreButton() {
  //   remove(this._loadMoreButtonComponent);
  //
  //   if (this._showingTasksCount >= this._pointsModel.getTasks().length) {
  //     return;
  //   }
  //
  //   const container = this._container.getElement();
  //   render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  //   this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  // }

  _updatePoints(count) {
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints().slice(0, count));
    // this._renderLoadMoreButton();
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingTask = null;
      if (newData === null) {
        pointController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._api.createTask(newData)
          .then((taskModel) => {
            this._pointsModel.addTask(taskModel);
            pointController.render(taskModel, PointControllerMode.DEFAULT);

            if (this._showingTasksCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
              const destroyedTask = this._showedPointControllers.pop();
              destroyedTask.destroy();
            }

            this._showedTaskControllers = [].concat(pointController, this._showedTaskControllers);
            this._showingTasksCount = this._showedTaskControllers.length;

            // this._renderLoadMoreButton();
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deleteTask(oldData.id)
        .then(() => {
          this._pointsModel.removeTask(oldData.id);
          this._updateTasks(this._showingTasksCount);
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updateTask(oldData.id, newData)
        .then((taskModel) => {
          const isSuccess = this._pointsModel.updateTask(oldData.id, taskModel);

          if (isSuccess) {
            pointController.render(taskModel, PointControllerMode.DEFAULT);
            this._updateTasks(this._showingTasksCount);
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  // _onSortTypeChange(sortType) {
  //   this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  //
  //   const sortedTasks = getSortedTasks(this._pointsModel.getTasks(), sortType, 0, this._showingTasksCount);
  //
  //   this._removeTasks();
  //   this._renderTasks(sortedTasks);
  //
  //   this._renderLoadMoreButton();
  // }

  // _onLoadMoreButtonClick() {
  //   const prevTasksCount = this._showingTasksCount;
  //   const tasks = this._pointsModel.getTasks();
  //
  //   this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
  //
  //   const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
  //   this._renderTasks(sortedTasks);
  //
  //   if (this._showingTasksCount >= sortedTasks.length) {
  //     remove(this._loadMoreButtonComponent);
  //   }
  // }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}
