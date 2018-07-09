const expect = require('expect');

//import the functiion u wana test in this case, isRealString
const {isRealString} = require('./validation'); 



//add some describe block on isRealString
//note that the isRealString function in validation.js returns true if the passed in string is string else false
describe('isRealString', () => {//here the module of the test starts

	//first case : should reject none string values
	it('should reject none string values', () => { //its a syncrhonous test no need of adding the done value
		var response = isRealString(80);

		expect(response).toBe(false);
	});

	//second case : should reject string with only spaces
	it('should reject string with only spaces', () => {
		var response = isRealString('    ');
		expect(response).toBe(false);
	});

	//should allow strings with none space characters
	it('should allow strings with non space characters', () => {
		var response = isRealString('  Andrew  ');
		expect(response).toBe(true)
	});
});
