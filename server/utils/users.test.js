const expect = require('expect');

const {Users} = require('./users');

describe('', () => {
	var seeded_user_instance;
	beforeEach(() => {//will get called before any test case
		seeded_user_instance = new Users();

		seeded_user_instance.users = [{
			id : '1',
			name : 'Mike',
			room : 'Node Course'
		}, 
		{
			id : '2',
			name : 'Jen',
			room : 'React Course'
		},
		{
			id : '3',
			name : 'Nurudeen',
			room : 'Node Course'
		}
		]
	});
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id : '123',
			name : 'Nurudeen',
			room : 'The Office Fans'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		//start assertions and expect user array defined in the a User class constructor empty array in the users.js file
		//we are actually checking if the initialized empty array is equal to the user object above  and if the user object was successfully added to the users array
		expect(users.users).toEqual([user]);  
	});

	it('should remove a user', () => {
		var userId = '2';
		var user = seeded_user_instance.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(seeded_user_instance.users.length).toBe(2);//to be 2 means weve successfully removed the user from the seeded users data
	});

	it('should not remove user', () => {
		var userId = '999';
		var user = seeded_user_instance.removeUser(userId);

		expect(user).toNotExist();
		expect(seeded_user_instance.users.length).toBe(3);//to be 2 means the user was not removed from the users seeded data which makes the array length remain to its default : 3
	});

	it('should find user by id', () => {
		var userId = '2';
		var user = seeded_user_instance.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('should not find user because the id specified is wrong', () => {
		var userId = '99';

		var user = seeded_user_instance.getUser(userId);
		expect(user).toNotExist();
	});


	it('should return user names for node course based on the room name', () => {
		var userList = seeded_user_instance.getUserList('Node Course');
		expect(userList).toEqual(['Mike', 'Nurudeen']);
	});

	it('should return user names for react course based on the room name', () => {
		var userList = seeded_user_instance.getUserList('React Course');
		expect(userList).toEqual(['Jen']);
	});
})
