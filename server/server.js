import http from 'http';
import path from 'path';
import express from 'express';
import socketIo from 'socket.io';
import randomColor from 'randomcolor';


const app = express();

app.use(express.static(`${path.resolve()}/../client`));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (sock) => {
  const color = randomColor();
  console.log(color);
  //sends to the one connection
  sock.emit('message', 'You are connected :)');

  //sends to all connections
  sock.on('message',(text) => io.emit('message', `${color}: ${text}`));
  sock.on('turn', ({ x, y }) => io.emit('turn', { x, y, color }));
});

server.on('error', () => {
  console.error(err);
});

server.listen(8080, ()=> {
  console.log('server is ready');
})