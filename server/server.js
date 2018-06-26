const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

//load express library
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
//console.log(__dirname + '/../public'); //__dirname tels us which directory we are!
//make app variable to configure our express application
var app = express();
var server = http.createServer(app);
//how to communicate between outr server and client
var io = socketIO(server);

//when a new user is connected, we alert that new user has been connected!
io.on('connection', (socket) => { 
	console.log('new user connected!');

	//listen for a disconnecting client when dey leave
	socket.on('disconnect', () => {
		console.log('Client from the browser has been disconnected!');
	})

});



//configuring our express static middleware using app.use()
app.use(express.static(publicPath)); //indirectly making our application homepage to go to the public directory and load data

server.listen(port, () => {
	console.log(`server running on port ${port}`);
});