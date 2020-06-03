import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoPointsComponent from "../components/no-points.js";
import SortComponent, {SortType} from "../components/sort.js";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "../controllers/point.js";
import PointsComponent from "../components/points.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderPoints = (pointListElement, points, onDataChange, onViewChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointListElement, onDataChange, onViewChange);
    pointController.render(point, PointControllerMode.DEFAULT);
    // console.log(pointController);
    return pointController;
  });
};

const getSortedPoints = (points, sortType, from, to) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedPoints = showingPoints.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedPoints = showingPoints.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedPoints = showingPoints;
      break;
  }

  return sortedPoints.slice(from, to);
};


export default class PageController {
  constructor(container, pointsModel, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;

    this._showedPointControllers = [];
    this._showingPointsCount = SHOWING_TASKS_COUNT_ON_START;
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._pointsComponent = new PointsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
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

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // console.log(this._pointsComponent.getElement());
    render(container, this._pointsComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points.slice(0, this._showingPointsCount));

    this._renderLoadMoreButton();
  }

  _renderPoints(points) {
    const pointListElement = this._pointsComponent.getElement();
    const newPoint = renderPoints(pointListElement, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoint);
    this._showingPointCount = this._showedPointControllers.length;
    // console.log(newPoint);
    // console.log(this._showedPointCount);
  }
  createTask() {
    if (this._creatingPoint) {
      return;
    }

    const pointListElement = this._pointsComponent.getElement();
    this._creatingPoint = new PointController(pointListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }


  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingPointsCount >= this._pointsModel.getPoints().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updatePoints(count) {
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePints();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.render(pointModel, PointControllerMode.DEFAULT);

            if (this._showingpointCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
              const destroyedPoint = this._showedPointControllers.pop();
              destroyedPoint.destroy();
            }

            this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
            this._showingPointsCount = this._showedPointControllers.length;

            this._renderLoadMoreButton();
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints(this._showingPointsCount);
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

          if (isSuccess) {
            pointController.render(pointModel, PointControllerMode.DEFAULT);
            this._updatePoints();
            this._updatePoints(this._showingPointCount);
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingPointsCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType, 0, this._showingPointsCount);

    this._removePoints();
    this._renderPoints(sortedPoints);

    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const prevPointsCount = this._showingPointsCount;
    const points = this._pointsModel.getPoints();

    this._showingPointsCount = this._showingPointsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedPoints = getSortedPoints(points, this._sortComponent.getSortType(), prevPointsCount, this._showingPointsCount);
    this._renderPoints(sortedPoints);

    if (this._showingPointsCount >= sortedPoints.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
