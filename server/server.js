const path = require('path');

//load express library
const express = require('express');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port = process.env.PORT || 3000; 
//console.log(__dirname + '/../public'); //__dirname tels us which directory we are!

//make app variable to configure our express application
var app = express();

//configuring our express static middleware using app.use()
app.use(express.static(publicPath)); //indirectly making our application homepage to go to the public directory and load data

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});