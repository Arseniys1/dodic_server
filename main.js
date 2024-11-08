require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('New client', socket.id);

    socket.on('chat message', (msg) => {
        console.log('Message:', msg);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnect', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME,() => {
    console.log(`DODIC server runned ${HOSTNAME}:${PORT}`);
});