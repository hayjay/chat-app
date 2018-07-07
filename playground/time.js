//Jan 1970 00:00:00:00
var moment = require('moment'); //represent the current point in time

var date = moment();
var someTimeStamp = moment().valueOf();

console.log(date.format('h:mm a'));//format returns a string that has just the string u specify 