## Method
```js
//aes加密
doAESEncrypt(text, password); 

//aes解密
doAESDecrypt(encText, password);

//base64 encode
base64encode(text);

//base64 decode
base64decode(text);

//md5 編碼
md5(text);
```

## Example
```js
var crypto = require('crypto_tool');
crypto.doAESEncrypt('abcd', '01234567890123456789012345678900');

crypto.doAESDecrypt(${enc_string}, '01234567890123456789012345678900');
```

## Test
```js
npm run test
```

## dependencies
	"dependencies": {
		"crypto_tool": "git+https://github.com/konalean/crypto_tool.git",
	  }



