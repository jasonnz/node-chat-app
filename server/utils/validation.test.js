const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=> {

    var params = {
        name: '',
        room: ''
    }    

    it('Should reject non-string values', (done) => {
        expect(isRealString(params.name)).toEqual(false);
        expect(isRealString(params.room)).toEqual(false);
        done();
    });

    it('Should reject string with only spaces', (done) => {
        params.name = '     ';
        params.room = '     ';
        expect(isRealString(params.name)).toEqual(false);
        expect(isRealString(params.room)).toEqual(false);
        done();
    });

    it('Should allow strings with non space characters', (done) => {
        params.name = 'hello';
        params.room = '   world again  ';
        expect(isRealString(params.name)).toEqual(true);
        expect(isRealString(params.room)).toEqual(true);
        done();
    });

});