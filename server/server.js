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
	console.log('New user connected!');

	socket.emit('newMessage', {
		from : 'Admin',
		text : 'Welcome to the chat app'
	});

	//socket.broadcast.emit from Admin text new user joined
	socket.broadcast.emit('newMessage', { //message all group members when a new user joins apart frm d user that just joined
		from : 'Admin',
		text : 'New user joined',
		createdAt : new Date().getTime()
	});

	//here is d body of d connection within d socket just wrapp all other socket function inside here

	//just like creating newly defined function name and using emit function to send data back to the client(browser)
 	socket.on('createEmail', (newEmail) => {
		console.log('Create email ', newEmail);
	});
	socket.on('createMessage', (message) => {
		console.log('New Message', message);

		//io.emit emits the message or event to every connected user on the app
		// io.emit('newMessage', {
		// 	from : newMessage.from,
		// 	text : newMessage.text,	
		// 	createdAt : now.getTime()
		// });

		// socket.broadcast.emit('newMessage', { //socket.broadcast will emit a message to all the connected user apart from myself
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : now.getTime()
		// });
	});
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