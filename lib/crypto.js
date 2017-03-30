'use strict';

var crypto = require('crypto');
var cryptoJS = require('crypto-js');
var md5 = require('MD5');


var cryptoTool = module.exports = function() {};

/**
 * 字串加密 
 *
 * @param text
 * @param password
 */
cryptoTool.prototype.doAESEncrypt = function(text, password) {
    return encryptAESStr(text, password);
};

/**
 * 字串解密
 *
 * @param encText 
 * @param password
 */
cryptoTool.prototype.doAESDecrypt = function(encText, password) {
    return decryptAESStr(encText, password);
};

/**
 * 將字串轉成base64格式
 *
 * @param text
 */
cryptoTool.prototype.base64encode = function(text) {
    return new Buffer(text).toString('base64');
}

/**
 * 將base64格式的字串轉為一般字串
 *
 * @param text
 */
cryptoTool.prototype.base64decode = function(text) {
    return new Buffer(text, 'base64').toString('ascii');
}

/**
 * 將字串以md5的格式編碼
 *
 * @param text
 */
cryptoTool.prototype.md5 = function(text) {
    return md5(text);
}

/**
 * 實作將字串用aes加密
 *
 * @param text
 * @param password
 */
function encryptAESStr(text, password) {
    var date = new Date();
    password = cryptoJS.enc.Utf8.parse(password);
    var ivStr = md5(date.getTime()).substring(0, 16);
    var iv  = cryptoJS.enc.Utf8.parse(ivStr); 
    text = cryptoJS.enc.Utf8.parse(text); 
    var encrypted = cryptoJS.AES.encrypt(text, password, {iv:iv, mode:cryptoJS.mode.CBC});  
    //var encString = encrypted.toString().getBytes().byte2hexString();
    var encString = byte2hexString(getBytes(encrypted.toString()));
    return ivStr + encString;
}

/**
 * 實作將字串用aes解密
 *
 * @param text
 * @param password
 */
function decryptAESStr(text, password) {
    password = cryptoJS.enc.Utf8.parse(password);
    var ivStr = text.substring(0, 16);
    var iv = cryptoJS.enc.Utf8.parse(ivStr); 
    // var decryptText = text.substring(16).hexString2byte().bytes2String();
    var decryptText = bytes2String(hexString2byte(text.substring(16)));
    var decrypted = cryptoJS.AES.decrypt(decryptText, password, {iv:iv, mode:cryptoJS.mode.CBC});  
    return decrypted.toString(cryptoJS.enc.Utf8);
}

/**
 * 在Array的原型再加上一個byte2hexString的method,
 * 將byte array轉換成16進位的string
 *
 */
//Array.prototype.byte2hexString = function() {
function byte2hexString(data) {
    //var bytes = this;
    var bytes = data;
    var result = "";
    for (var i = 0; i < bytes.length; i++) {
        if ((parseInt(bytes[i]) & 0xff) < 0x10) {
            result += "0";
        }
        result += parseInt(bytes[i] & 0xff).toString(16);
    }
    
    return result;
}

/**
 * 將byte array轉成string
 *
 */
//Array.prototype.bytes2String = function() {
function bytes2String(data) {
    //array = this;
    var array = data;
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i]));
    }
    return result;
}

/**
 * 將16進位的字串轉成byte
 *
 */
//String.prototype.hexString2byte = function() {
function hexString2byte(data) {
    //hexString = this;
    var hexString = data;
    if(hexString==undefined || hexString==null || hexString=='') {
        return null;
    }
    
    var bytes = [];
    for(var i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substring(i, i+2), 16) & 0xff);
    }
    
    return bytes;
}

/**
 * 將字串轉為bytes
 *
 */
//String.prototype.getBytes = function () {
function getBytes(data) {
    var bytes = [];
    /*
    for (var i = 0; i < this.length; ++i) {
        bytes.push(this.charCodeAt(i));
    }
    */
    for (var i = 0; i < data.length; ++i) {
        bytes.push(data.charCodeAt(i));
    }
    return bytes;
};


