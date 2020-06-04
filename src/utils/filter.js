import {formatDate, dateBefore, isOneDay, isOverdueDate} from "./common.js";
import {FilterType} from "../const.js";

export const getFavoriteTasks = (points) => {
  return points.filter((point) => point.isFavorite);
};

export const getFuturePoints = (points, dateNow) => {
  // console.log(dateNow);
  return points.filter((point) => {
    // console.log(point);
    // console.log(point.dateFrom);
    return dateBefore(dateNow, point.dateFrom);
  });
  // console.log(forReturn);
  // return forReturn;
};

export const getPastPoints = (points, dateNow) => {
  // console.log(dateNow);
  const forReturn = points.filter((point) => {
    // console.log(point);
    // console.log(point.dateFrom);
    return dateBefore(point.dateFrom, dateNow);
  });
  // console.log(forReturn);
  return forReturn;
};
//
// export const getPastPoints = (points) => {
//   return points.filter((point) => point.inPast);
// };

export const getOverdueTasks = (points, date) => {
  return points.filter((point) => {
    const dueDate = point.dateFrom;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

export const getTasksInOneDay = (points, date) => {
  return points.filter((point) => isOneDay(point.dateFrom, date));
};

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return points;
    // case FilterType.FAVORITES:
    //   return getFavoriteTasks(points);
    case FilterType.FUTURE:
      return getFuturePoints(points, nowDate);
    case FilterType.PAST:
      return getPastPoints(points, nowDate);
    // case FilterType.PAST:
    //   return getOverdueTasks(points, nowDate);
    // case FilterType.TODAY:
    //   return getTasksInOneDay(points, nowDate);
  }

  return points;
};
