var moment = require('moment');

var createdAt = 1;
// if empty default is the current time
var date = moment();
date.add(1, 'month').subtract(2, 'months')
console.log(date.format('hh:mm a'));

// Jan 1st 1970 00:00:00 am
// var date = new Date();
// console.log(date.getMonth());

console.log(new Date().getTime());
// Is the same as
console.log(moment().valueOf());