var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running localhost:8000");

var all_lines = [];

io.on('connection', function (socket) {
   for (var i in all_lines) {
      socket.emit('draw_line', { line: all_lines[i] } );
   }
	
   socket.on('draw_line', function (data) {
      all_lines.push(data.line);
	  io.emit('draw_line', { line: data.line } );
   });
});
