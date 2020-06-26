export function changeHourOfDate(date) {
  let newDate = new Date(date.getYear() + 1900, date.getMonth(), date.getDate(), 9, 0, 0);
  return newDate;
}
export function formatDate(value) {
  return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() + 1900);
}