/**
 * Created by cyl on 21/09/15.
 */
var fs     = require('fs');
var path   = require('path');
var sshDir = process.env['HOME'] + '/.ssh/id_rsa';

var privateKey = fs.readFileSync(sshDir);

console.log(privateKey);
