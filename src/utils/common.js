import moment from "moment";

export const dateBefore = (dateNow, dateFrom) => {
  // console.log(moment.utc(dateNow).format(`YYYY-MM-DDTHH:mm:ss.SSSSZ`));
  // console.log(moment.utc(dateFrom).format(`YYYY-MM-DDTHH:mm:ss.SSSSZ`));
  // console.log(moment(dateFrom).isBefore(dateNow));
  return moment(dateNow).isBefore(dateFrom);
};

export const formatTime = (date) => {
  return moment.utc(date).format(`HH:MM`);
};

export const formatDate = (date) => {
  return moment.utc(date).format(`DD MMMM`);
};

export const durationTime = (dateFrom, dateTo) => {
  return moment(moment.duration(dateTo) - moment.duration(dateFrom)).format(`HH:mm`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment.utc(dateA);
  const b = moment.utc(dateB);
  const c = a.diff(b, `day`);
  return c; //  === 0 && dateA.getDate() === dateB.getDate()
};
