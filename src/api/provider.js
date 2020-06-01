import Point from "../models/point.js";
import {nanoid} from "nanoid";

const isOnline = () => {
  return window.navigator.onLine;
};

// const getSyncedTasks = (items) => {
//   return items.filter(({success}) => success)
//     .map(({payload}) => payload.task);
// };

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points); // .map((point) => point.toRAW()));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(Point.parseTasks(storePoints));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers); // (tasks.map((task) => task.toRAW()));
          this._store.setItems(items);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems());

    return Promise.resolve(Point.parseTasks(storeOffers));
  }

  createTask(task) {
    if (isOnline()) {
      return this._api.createTask(task)
        .then((newTask) => {
          this._store.setItem(newTask.id, newTask.toRAW());

          return newTask;
        });
    }

    // На случай локального создания данных мы должны сами создать `id`.
    // Иначе наша модель будет не полной и это может привнести баги.
    const localNewPointId = nanoid();
    const localNewPoint = Point.clone(Object.assign(task, {id: localNewPointId}));

    this._store.setItem(localNewPoint.id, localNewPoint.toRAW());

    return Promise.resolve(localNewPoint);
  }

  updateTask(id, point) {
    if (isOnline()) {
      return this._api.updateTask(id, point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint.toRAW());

          return newPoint;
        });
    }

    const localPoint = Point.clone(Object.assign(point, {id}));

    this._store.setItem(id, localPoint.toRAW());

    return Promise.resolve(localPoint);
  }

  // deleteTask(id) {
  //   if (isOnline()) {
  //     return this._api.deleteTask(id)
  //       .then(() => this._store.removeItem(id));
  //   }
  //
  //   this._store.removeItem(id);
  //
  //   return Promise.resolve();
  // }

  // sync() {
  //   if (isOnline()) {
  //     const storeTasks = Object.values(this._store.getItems());
  //
  //     return this._api.sync(storeTasks)
  //       .then((response) => {
  //         // Забираем из ответа синхронизированные задачи
  //         const createdTasks = getSyncedTasks(response.created);
  //         const updatedTasks = getSyncedTasks(response.updated);
  //
  //         // Добавляем синхронизированные задачи в хранилище.
  //         // Хранилище должно быть актуальным в любой момент.
  //         const items = createStoreStructure([...createdTasks, ...updatedTasks]);
  //
  //         this._store.setItems(items);
  //       });
  //   }
  //
  // return Promise.reject(new Error(`Sync data failed`));
  // }
}
