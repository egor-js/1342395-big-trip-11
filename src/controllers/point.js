import PointComponent from "../components/point.js";
import PointEditComponent from "../components/point-edit.js";
import PointModel from "../models/point.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
// import {COLOR, DAYS} from "../const.js";

// const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  description: ``,
  dateTo: null,
  dateFrom: null,
  destination: ``,
  type: ``,
  // color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false,
};

const parseFormData = (formData) => {
  const date = formData.get(`date`);
  // const repeatingDays = DAYS.reduce((acc, day) => {
  //   acc[day] = false;
  //   return acc;
  // }, {});

  return new PointModel({
    "description": formData.get(`text`),
    // "due_date": date ? new Date(date) : null,
    // "repeating_days": formData.getAll(`repeat`).reduce((acc, it) => {
    // acc[it] = true;
    // return acc;
    // }, repeatingDays),
    "color": formData.get(`color`),
    "is_favorite": false,
    "is_done": false,
  });
};


export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point);

    // this._taskComponent.setEditButtonClickHandler(() => {
    //   this._replaceTaskToEdit();
    //   document.addEventListener(`keydown`, this._onEscKeyDown);
    // });

    // this._pointComponent.setArchiveButtonClickHandler(() => {
    //   const newTask = PointModel.clone(task);
    //   newTask.isArchive = !newTask.isArchive;
    //
    //   this._onDataChange(this, task, newTask);
    // });

    // this._pointComponent.setFavoritesButtonClickHandler(() => {
    //   const newPoint = PointModel.clone(point);
    //   newPoint.isFavorite = !newPoint.isFavorite;
    //   this._onDataChange(this, point, newPoint);
    // });

    // this._pointEditComponent.setSubmitHandler((evt) => {
    //   evt.preventDefault();
    //
    //   const formData = this._pointEditComponent.getData();
    //   const data = parseFormData(formData);
    //
    //   this._pointEditComponent.setData({
    //     saveButtonText: `Saving...`,
    //   });
    //
    //   this._onDataChange(this, point, data);
    // });
    // this._pointEditComponent.setDeleteButtonClickHandler(() => {
    //   this._pointEditComponent.setData({
    //     deleteButtonText: `Deleting...`,
    //   });
    //
    //   this._onDataChange(this, point, null);
    // });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointEditComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._pointEditComponent, oldPointEditComponent);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointEditComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointEditComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  // shake() {
  //   this._taskEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  //   this._taskComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  //
  //   setTimeout(() => {
  //     this._taskEditComponent.getElement().style.animation = ``;
  //     this._taskComponent.getElement().style.animation = ``;
  //
  //     this._taskEditComponent.setData({
  //       saveButtonText: `Save`,
  //       deleteButtonText: `Delete`,
  //     });
  //   }, SHAKE_ANIMATION_TIMEOUT);
  // }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditComponent.reset();

    if (document.contains(this._pointEditComponent.getElement())) {
      replace(this._pointComponent, this._pointEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
