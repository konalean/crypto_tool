'use strict';

var crypto = require('../index');
var expect = require('expect.js');

describe('md5 test', function() {
    it('should be successful', function() {
        expect(crypto.md5('1234')).to.be('81dc9bdb52d04dc20036dbd8313ed055');
    });
});

describe('base64 test', function() {
    it('encode should be successful', function() {
        expect(crypto.base64encode('1234')).to.be('MTIzNA==');
    });

    it('decode should be successful', function() {
        expect(crypto.base64decode('MTIzNA==')).to.be('1234');
    });
});

describe('aes encrypt test', function() {
    var text = '12345';
    var key = '01234567890123456789012345678901';
    var encryptStr = crypto.doAESEncrypt(text, key);
    it('should be equal', function() {
        expect(text).to.be(crypto.doAESDecrypt(encryptStr, key));
    });
});