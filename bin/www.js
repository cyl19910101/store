var cluster = require('cluster');

cluster.setupMaster({
    exec:'worker.js'
});

var cpus = require('os').cpus().length;
for(var i = 0; i < cpus; i++) {
    cluster.fork();
}
