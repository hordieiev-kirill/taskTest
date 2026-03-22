import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions += 1;
  io.emit('sessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions = Math.max(0, activeSessions - 1);
    io.emit('sessions', activeSessions);
  });
});

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
