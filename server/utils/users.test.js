const expect = require('expect');
const {Users} = require('./Users');

describe('Users', () => {

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

});