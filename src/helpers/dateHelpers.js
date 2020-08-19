export function changeHourOfDate(date) {
  let newDate = new Date(date.getYear() + 1900, date.getMonth(), date.getDate(), 9, 0, 0);
  return newDate;
}
export function formatDate(value) {
  return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() - 100);
}
export function getDateWithoutTime(date){
  return new Date(date.getYear() + 1900, date.getMonth(), date.getDate());
}

export function validateClientAndDates(client, lastDelivery, nextDelivery) {
  let validation = {};
  if(client !== '' && client.replace(/ /g, '') !== ''){
    if(nextDelivery > lastDelivery){
      validation.isValid = true;
    }else{
      validation.isValid = false;
      validation.err = 'dates';
      validation.msg = 'Proxima entrega debe ser posterior a ultima entrega'
    }
  }else{
    validation.isValid = false;
    validation.err = 'client';
    validation.msg = 'Campo cliente es requerido'
  }
  return validation
}