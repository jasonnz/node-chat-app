var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=> {

    it('Should generate the correct message object', (done) => {
        var from = 'test@test.com';
        var text = 'test message';

        var message = generateMessage(from, text);
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
        done();
    });

});