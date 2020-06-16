import http from 'http';
import path from 'path';
import express from 'express';
import socketIo from 'socket.io';
import randomColor from 'randomcolor';

import createBoard from './create-board.js';

const app = express();

app.use(express.static(`${path.resolve()}/../client`));

const server = http.createServer(app);
const io = socketIo(server);

const { clear, getBoard, makeTurn } = createBoard(20);

io.on('connection', (sock) => {
  const color = randomColor();
  console.log(color);
  //sends to the one connection
  sock.emit('board', getBoard());

  //sends to all connections
  sock.on('message',(text) => io.emit('message', `${color}: ${text}`));
  sock.on('turn', ({ x, y }) => {
    makeTurn(x, y, color);
    io.emit('turn', { x, y, color })
  });
});

server.on('error', () => {
  console.error(err);
});

server.listen(8080, ()=> {
  console.log('server is ready');
})