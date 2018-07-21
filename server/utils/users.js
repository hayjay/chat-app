[{
	id : 'sdsjdj#jsdd',
	name : 'Nurudeen',
	room : 'Room One'
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

//creating classes in ES6
class Users{
	constructor (){
		this.users = []; //array defined up
	}

	addUser (id, name, room)  {
		var user = {id , name, room};
		this.users.push(user);
		    var userData = {
		      name: name,
		      room: room
		    };
		    //use schema.create to insert data into the db
		    User.create(userData, function (err, user) {
		      if (err) {
		        return next(err);
		      } else {
		        return res.redirect('/');
		      }
		    });
		return user;
	}

	removeUser(id) {
		var user = this.getUser(id);

		if(user){//if user was found try poping out by removing from the list
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;
	}

	getUser(id) {
		return this.users.filter((user) => user.id === id)[0]; //return the first index or undefined if non found
	}

	getUserList(room){
		//array.filter returns true if the condition is met and update the users variable assign to it else false
		var users = this.users.filter((each_user) => each_user.room === room); //this.users here is the users array in the class constructor
		//use array.map to return object string
		var namesArray = users.map((each_user) => each_user.name);

		return namesArray;
	}
}

module.exports = {Users};
// class Person {
// 	constructor (name, age) {
// 		this.name = name; //this here refersto the instance rather than the class
// 		this.age = age;
// 	}

// 	getUserDescription(){
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }

// var me = new Person('Ajayi Nurudeen', 25);
// var description = me.getUserDescription();
// console.log(description);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
