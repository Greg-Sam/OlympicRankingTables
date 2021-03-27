let dateIn = parseInt(1565481600000)
console.log(dateIn)
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var date = new Date(dateIn); // Thu Apr 09 2020 14:28:32 GMT+0100 (British Summer Time)
let year = date.getFullYear(); // 2020
let month = date.getMonth() + 1; // 4 (note zero index: Jan = 0, Dec = 11)
month = months[date.getMonth()]
let day = date.getDate(); // 9

console.log(date, month, day, year)