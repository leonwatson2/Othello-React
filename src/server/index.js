import express from 'express'
import { Server } from 'http' 
import { createStartBoard } from '../store/reducers/boardReducer';

var server = Server(app)
var app = express();
var io = require('socket.io')(server);

server.listen(3001, ()=>{
  console.log("ON")
});

app.get('/', function (req, res) {
  res.status(200).json({ok:1})
});

io.on('connection', function (socket) {
  setTimeout(()=>{
    socket.emit('yes', "wef")
  }, 3000)
  console.log("Connected")
});

//
let game = {
  players:[],
  board: createStartBoard()
}
var nsp = io.of('/me')
nsp.on('connection', (socket)=>{
  console.log("Hey a connection")
  addPlayer(game, socket)
  nsp.emit('player', game)
})

function addPlayer(game, player){
  if(game.players.length < 2){
    game.players.push(player.id)
  }
}