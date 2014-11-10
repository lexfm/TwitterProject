const cluster = require('cluster');
 
if (cluster.isMaster) {
	console.log('Master Forking!!!!');
	for (i = 0; i < 5; i++) {
		cluster.fork();
	}
} else {
	console.log('Child process running!!!');
}
 
cluster.on('online', function(worker) {
	console.log('Worker ' + worker.process.pid + ' is online.');
});