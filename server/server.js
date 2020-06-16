import http from 'http';
import path from 'path';
import express from 'express';
import socketIo from 'socket.io';


const app = express();

app.use(express.static(`${path.resolve()}/../client`));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (sock) => {
  //sends to the one connection
  sock.emit('message', 'You are connected :)');

  //sends to all connections
  sock.on('message',(text) => io.emit('message', text));
});

server.on('error', () => {
  console.error(err);
});

server.listen(8080, ()=> {
  console.log('server is ready');
})