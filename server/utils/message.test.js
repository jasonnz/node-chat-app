var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', ()=> {

    it('Should generate the correct location object', (done) => {
        var from = 'test@test.com';
        var lat = 10;
        var lng = 15;
        var message = generateLocationMessage(from, lat, lng);
        var url =  `https://www.google.co.nz/maps?q=${lat},${lng}`;
        expect(message.from).toEqual(from);
        expect(message).toInclude({from, url});
        expect(message.url).toBeA('string');
        done();
    });

});