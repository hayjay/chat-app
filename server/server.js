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

const now = new Date();
//when a new user is connected, we alert that new user has been connected!
io.on('connection', (socket) => { 
	console.log('New user connected!');

	//here is d body of d connection within d socket just wrapp all other socket function inside here

	//just like creating newly defined function name and using emit function to send data back to the client(browser)
	socket.emit('newEmail', { //emitting data with our event or send new email as a sharp endpoint to the client
		from: 'Mike@example.com',
		text: 'Hey whats going on ?',
		createdAt: 123
	});

	socket.on('createEmail', (newEmail) => {
		console.log('Create email ', newEmail);
	});
	socket.on('createMessage', (newMessage) => {
		console.log('New message '+ newMessage);
	});
	//listen for a disconnecting client when dey leave
	socket.on('disconnect', () => {
		console.log('Client from the browser has been disconnected!');
	})

	//CHAT APPLICATION CODE BEGINS
	socket.emit('newMessage', { //as soon as the user get connected to the server, we gonna emit that event
		from : 'Olawale',
		text : 'Good morning everyone',
		createdAt : now
	});



});



//configuring our express static middleware using app.use()
app.use(express.static(publicPath)); //indirectly making our application homepage to go to the public directory and load data

server.listen(port, () => {
	console.log(`server running on port ${port}`);
});