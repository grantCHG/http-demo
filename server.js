var http = require('http');
var serverControl = require('./server/index');
var PORT = 3000;
var server = http.createServer(function(request, response) {
    serverControl(request,response);
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");