var fs = require('fs');  // file system
var http = require('http');
var server = http.createServer(function (req, res) {
  // logic here to determine what file, etc
  var rstream = fs.createReadStream('package.json');
  rstream.pipe(res);
});
server.listen(9000, '127.0.0.1');  // start 	