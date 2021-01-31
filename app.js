const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/player', (req, res) => {
  res.sendFile(__dirname + '/player.html');
});

app.get('/client.js', function(req, res){
	res.sendFile(__dirname + '/client.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});