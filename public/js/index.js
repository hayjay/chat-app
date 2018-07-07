var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  //append every new message to the li
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) { //pass arg e to prevent defualt page refresh
	e.preventDefault(); //stops the browser from reloading when the form is submitted

	socket.emit('createMessage', {
		from : 'User',
		text : jQuery('[name=message]').val()
	}, function () {
		//callback function in order to fulfill the acknowledgement
	});
});

// socket.on('disconnect', function () {
// 	console.log('Disconnected from the server');
// });

// socket.on('newEmail', function(email_from_server) {//recieve data from server n display to browsers/client
// 	console.log('new email has arrived!', email_from_server);
// });

// socket.emit('newMessage', function (message){
// 	console.log('newMessage', message); 
// });

// socket.emit('createMessage', 'Hi, good morning whatsup', function (data) {
// 	console.log('Got it!', data);
// });