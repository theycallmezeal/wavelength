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

var spectra = [
  ['sexy', 'unsexy'],
  ['red', 'blue'],
  ['safe', 'dangerous'],
  ['underrated', 'overrated'],
  ['good for you', 'bad for you']
]

var listOfTVs = [];
var gameStage = 'ASSIGN' // values: ASSIGN > CLUE > GUESS > REVEAL > ASSIGN > ...
var spectrum = [];
var clue = '';
var answer = 1;
var guess = 50;

function emitGame() {
  io.emit('emit game', {
    gameStage: gameStage,
    spectrum: spectrum,
    clue: clue,
    answer: answer,
    guess: guess
  });
}

function listOfConnections() {
  var list = [];
  for (var i of io.of("/").adapter.rooms.keys()) {
    list.push(i);
  }
  return list;
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
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
    spectrum = randomFromList(spectra);
    answer = Math.floor(Math.random() * 100) + 1;
    emitGame();
  });

  socket.on('give clue', (providedClue) => {
    gameStage = 'GUESS';
    clue = providedClue;
    emitGame();
  });

  socket.on('guess', () => {
    gameStage = 'REVEAL';
    emitGame();
  })

  socket.on('end round', () => {
    gameStage = 'ASSIGN';
    var spectrum = [];
    var clue = '';
    var answer = 1;
    var guess = 50;
    io.emit('reset');
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});