var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//hide loader of the page by default
$(".loader").hide();

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  //append every new message to the li
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target ="_blank">My Current Location</a>');
	var formattedTime = moment(message.createdAt).format('h:mm a')
	li.text(`${message.from} : `);
	a.attr('href', message.url); //sets the attribute of the a tag to b the url from the server
	li.append(a, ` at ${formattedTime}`); //append the generated anchor tag to the list or li tag where li now holds the value of anchor tage

	jQuery("#messages").append(li); //append li tag to the end of the list
});

jQuery('#message-form').on('submit', function (e) { //pass arg e to prevent defualt page refresh
	e.preventDefault(); //stops the browser from reloading when the form is submitted

	var messageTextBox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from : 'User',
		text : messageTextBox.val()
	}, function () {
		//callback function in order to fulfill the acknowledgement that is when the message has been delivered
		messageTextBox.val('');
	});
});


var locationButton = jQuery("#send-location");

locationButton.on('click', function () {
	if(!navigator.geolocation){ //if there is no geolocaiton object on navigator
		 return alert('Geolocation not supported by ur browser!');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');
	$(".loader").show();
	navigator.geolocation.getCurrentPosition(function (position) {//gets the users browser position or location
		locationButton.removeAttr('disabled').text('Send location'); //remove the locked button when the user already accepted/allowed the access
		$(".loader").hide();
		socket.emit('createLocationMessage', {
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	}, function (){
		locationButton.removeAttr('disabled').text('Send location'); //remove the locked button when the user already accepted/allowed the access
		$(".loader").hide();
		alert('Unable to fetch location because u denied access');
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