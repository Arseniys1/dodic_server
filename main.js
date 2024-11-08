const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Создаем экземпляр Express
const app = express();

// Создаем HTTP-сервер на основе Express
const server = http.createServer(app);

// Инициализируем Socket.IO на сервере
const io = socketIo(server);

// Устанавливаем статическую папку для Express
app.use(express.static(__dirname + '/public'));

// Обработка подключения клиента
io.on('connection', (socket) => {
    console.log('New client', socket.id);

    // Обработка события 'chat message' от клиента
    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        // Отправка сообщения всем клиентам, включая отправителя
        io.emit('chat message', msg);
    });

    // Обработка отключения клиента
    socket.on('disconnect', () => {
        console.log('Client disconnect', socket.id);
    });
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
server.listen(PORT, HOSTNAME,() => {
    console.log(`DODIC server runned ${HOSTNAME}:${PORT}`);
});