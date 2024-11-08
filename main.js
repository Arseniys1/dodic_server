import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import {setHandlers} from './handlers.js';

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);

app.use(express.static(new URL('./public', import.meta.url).pathname));

setHandlers(io);

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
    console.log(`DODIC server runned ${HOSTNAME}:${PORT}`);
});