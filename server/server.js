const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (params, callback) => {  //listens for an event emmitted from client side
  	if(!isRealString(params.name) || !isRealString(params.room)){
  		callback('Display name and room is required!'); //the string we passed in the callback function is like the first parameter of callback method on the client side
  	}

  	socket.join(params.room);
  	//remove current user from previous room they were before adding them to the new room
  	users.removeUser(socket.id);
  	users.addUser(socket.id, params.name, params.room);
  	//emit the event to the client

  	io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //second parameter of emit function returns users array from the users.getUserList 
  	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  	//socket.boradcast.emit sends message to everyone connected to the chat except from the authenticated user
  	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
  	callback();
  });
  socket.on('createMessage', (message, callback) => {
  	var user = users.getUser(socket.id);

  	//check if user was found and if someone tries sending empty message not a string, it wont send to everybody
  	if(user && isRealString(message.text)) {//if it exist
		//when a new message comes in, we need emit to user in that room i.e user connected that there is a new message using io.to(room_user_joined).emit
	    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
  	}
    callback();


    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
  	var user = users.getUser(socket.id);

  	if(user){
		//note, while emmitting newMessage means client side has done socket.on on index.js
		io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
  	}
  });

  socket.on('disconnect', () => {
    var removed_user = users.removeUser(socket.id);
    if(removed_user){
    	//emit to update users list
    	io.to(removed_user.room).emit('updateUserList', users.getUserList(removed_user.room));
    	//print a message to notify memebers of the room the user who left the room
    	io.to(removed_user.room).emit('newMessage', generateMessage('Admin', `${removed_user.name} has left.`));
    }
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});





// const path = require('path');
// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');

// const {generateMessage} = require('./utils/message');
// const publicPath = path.join(__dirname, '../public');
// const port = process.env.PORT || 3000;
// var app = express();
// var server = http.createServer(app);
// var io = socketIO(server);

// app.use(express.static(publicPath));

// io.on('connection', (socket) => {
//   console.log('New user connected');

//   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

//   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

//   socket.on('createMessage', (message, callback) => {
//     console.log('createMessage', message);
//     io.emit('newMessage', generateMessage(message.from, message.text));
//     callback('This is from the server.');
//     // socket.broadcast.emit('newMessage', {
//     //   from: message.from,
//     //   text: message.text,
//     //   createdAt: new Date().getTime()
//     // });
//   });

//   socket.on('disconnect', () => {
//     console.log('User was disconnected');
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is up on ${port}`);
// });