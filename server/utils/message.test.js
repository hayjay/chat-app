var expect = require('expect');

var {generateMessage} = require('./message');
describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		//steps in testing if the message.js file returns the expected generated message data
		//store res in variable
		//assert 'from' match matches the value u passed in
		//assert that the text matches the value u passed in
		//asert that the createdAt value is a number using the toBeA method
		var from = 'Jen';
		var text = 'Good morning, everyone!';
		var message = generateMessage(from, text);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from : from,
			text : text,
		});
		// expect(generateMessage.from) = 
	});
});