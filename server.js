const http = require('http');
const dotenv = require('dotenv');
const io = require('socket.io')(http);	
dotenv.load();

// var server = require('http').createServer();
// var io = require('socket.io')(server);
// io.on('connection', function(client){
//   client.on('event', function(data){});
//   client.on('disconnect', function(){});
// });
// server.listen(3000);



const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

io.on('connection', function(socket){
	socket.on('event', function(data){});
  	socket.on('disconnect', function(){});
  	console.log('a user connected');
});

server.listen(process.env.PORT, function(){
  	console.log('listening on :' + process.env.PORT);
});