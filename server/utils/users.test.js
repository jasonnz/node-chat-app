const expect = require('expect');
const {Users} = require('./Users');

describe('Users', () => {

    var users;

    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Joe',
            room: 'Node Course'
        }, 
        {
            id: 2,
            name: 'John',
            room: 'React Course'
        },
        {
            id: 3,
            name: 'Anne',
            room: 'Node Course'
        }];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: 12345,
            name: 'name',
            room: 'room'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Joe', 'Anne']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['John']);
    });

    it('should remove a user', () => {
        var userList = users.removeUser(1);
         expect(userList.length).toEqual(2);
    });

    it('should not remove a user', () => {
        var userList = users.removeUser(100);
        expect(userList.length).toEqual(3);
    });

    it('should find a user', () => {
        var userList = users.getUser(3);
        expect(userList).toEqual([users.users[2]]);
    });

    it('should not find a user', () => {
         var userList = users.getUser(30);
         expect(userList).toEqual([]);
    });

});