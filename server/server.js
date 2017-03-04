const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io')
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.on('disconnect', (socket)=> {
        console.log('Disconnected from client');
    });
});

server.listen(port, ()=> {
    console.log('Started at port ', port);
});