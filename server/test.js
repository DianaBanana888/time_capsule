const addDays = 3;
const date = new Date()
const newDate = date.setDate(date.getDate() + addDays)
console.log(newDate);
console.log(date.toTimeString());
