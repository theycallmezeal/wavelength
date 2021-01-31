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
var gameStage = 'ASSIGN' // values: ASSIGN > CLUE > GUESS > REVEAL > ASSIGN > ...
var clueGiver = '';

function emitGame() {
  console.log(listOfConnections());
  io.emit('emit game', {
    gameStage: gameStage
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
  });

  socket.on('claim turn', () => {
    gameStage = 'CLUE';
    emitGame();
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});