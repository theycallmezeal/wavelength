const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/player.html');
});

app.get('/tv', (req, res) => {
  res.sendFile(__dirname + '/tv.html');
});

app.get('/player.js', function(req, res){
	res.sendFile(__dirname + '/player.js');
});

app.get('/tv.js', function(req, res){
	res.sendFile(__dirname + '/tv.js');
});

var listOfTVs = [];

function emitGame() {
  console.log(listOfConnections());
  io.emit('emitGame', {

  });
}

function listOfConnections() {
  var list = [];
  for (var i of io.of("/").adapter.rooms.keys()) {
    list.push(i);
  }
  return list;
}

io.on('connection', (socket) => {
  console.log('a user connected');
  emitGame();

  socket.on('disconnect', () => {
    console.log('user disconnected');
    emitGame();
  });

  socket.on('register as tv', () => {
    listOfTVs.push(socket.id);
    console.log('list of tvs:');
    console.log(listOfTVs);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});