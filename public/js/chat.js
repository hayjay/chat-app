var socket = io();

function scrollToBottom () {
	//selectors
	var messages = jQuery("#messages"); //select element with the id of messages
	//determine the last message of the chat
	var newMessage = messages.children('li:last-child');
	// calculation to figure out if the scroll top + clientheight is greater than or equal to the client height
	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');

	//get the height of the newly added message takin into consideration the padding weve applied to the li/ new  message css
	var newMessageHeight = newMessage.innerHeight();
	//get the message before the last message
	var lastMessageHeight = newMessage.prev().innerHeight(); //goes and pick the last children before the current children (ne wmessage)


	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function () {
	//when a new user connects, collect the name of the user and name of d room he wants to join using jQuery.params()

	//jQuery.deparams converts string to an object 
	var params = jQuery.deparam(window.location.search); //windows.location.search collects the get request of d user data sent to the browsers address bar

	socket.emit('join', params, function(err){ //as callback to server.js here, err: serve as the first parameter to server.js
		if (err) {
			alert(err);
			window.location.href = '/';
		}else{
			console.log('No error');
			//if there is no error while user is trying to join room
		}
	}); //
  console.log('Connected to server');
});

//when a user disconnect from the chat app, we wana let the other members of the room he was know he left and update the rememning number of users in the room
socket.on('disconnect', function () {
	console.log('disconnected')
});

socket.on('updateUserList', function(users) {
	var ol = jQuery('<ol></ol>');

	users.forEach(function(user){
		//add li element to ol element using append
		ol.append(jQuery('<li></li>').text(user));
	});
	//wipe the list and add the new users to the dom using .html instead of append
	jQuery("#users").html(ol);
	// console.log('Users List', users);
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

	//automatically scroll the page to the bottom when a user adds a new message 
	scrollToBottom();		
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

	//scroll page to bottom whenever der is a new location added
	scrollToBottom();		
});

jQuery('#message-form').on('submit', function (e) { //pass arg e to prevent defualt page refresh
	e.preventDefault(); //stops the browser from reloading when the form is submitted

	var messageTextBox = jQuery('[name=message]');
	socket.emit('createMessage', {
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