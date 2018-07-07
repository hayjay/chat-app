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
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		text : message.text, //passing second parameter as d data to Mustache.render()
		from : message.from,
		createdAt : formattedTime
	});

	jQuery("#messages").append(html);		
});

socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	//grab the template from html, make sure u have created a mustache fille template on .html file first
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, { //mstache.render takes in two argument, the template u wana render and the data u wana send to the template
		from :  message.from,
		url : message.url,
		createdAt : formattedTime
	});
	console.log(html);
	jQuery("#messages").append(html);
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