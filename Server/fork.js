const
	fs = require('fs'),
	process = require('child_process');
			
 
for(var i=0; i<10; i++) {
	var ls = process.fork("worker.js", [i]);	
	
	ls.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	});
}