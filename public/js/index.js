var socket = io(); //creates a connection socket for sending to server and recieving data from server
socket.on('connect', function () {
	console.log('connected to the server!');

	socket.emit('createEmail', { //send or emit  stuffs to the server just like a post request
		to: 'Janet@example.com',
		text: 'Hey, This is janet!'
	});

	socket.emit('createMessage', {
		text : 'Am sengind this message to the server!',
		from : 'now now'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from the server');
});

socket.on('newEmail', function(email_from_server) {//recieve data from server n display to browsers/client
	console.log('new email has arrived!', email_from_server);
});

socket.emit('newMessage', function (message){
	console.log('newMessage', message); 
});

socket.on('newMessage', function (message){
	console.log('newMessage', message); 
});

