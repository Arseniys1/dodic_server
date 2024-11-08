import {onFindMe} from "./messages.js";

const clients = [];
let io;

const setHandlers = (_io) => {
    io = _io;
    _io.on('connection', onConnect);
    _io.on('disconnect', onDisconnect);
};

const onConnect = (socket) => {
    console.log(`New client ${socket.id}`);

    clients.push(socket);

    socket.on('message', (message) => onMessage(socket, message));
    socket.on('findMe', (message) => onFindMe(socket, message));
};

const onMessage = (socket, message) => {
    console.log(`New message ${message}`);

    io.emit('message', message);
};

const onDisconnect = (socket) => {
    console.log(`Client disconnect ${socket.id}`);

    clients.splice(clients.indexOf(socket), 1);
};


export {
    clients,
    io,
    setHandlers,
};



