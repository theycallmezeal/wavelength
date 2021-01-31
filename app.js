const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', function(req, res){
	res.sendFile(__dirname + '/client.js');
});

var numClients = 0;
var tvID = '';

function emitGame() {
  io.emit('emitGame', {"numClients": numClients});
}

io.on('connection', (socket) => {
  console.log('a user connected');
  numClients++;
  if (numClients == 1) {
    tvID = socket.id;
  }
  emitGame();

  socket.on('disconnect', () => {
    console.log('user disconnected');
    numClients--;
    emitGame();
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});