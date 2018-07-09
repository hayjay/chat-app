var isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0; //returns true if the passed in string is a string and false for non string
};

module.exports = {isRealString};