const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback)=> {
        io.emit('newMessage', generateMessage(message.from, message.text, new Date().getTime()));
        callback('This is from the server');
    });

    socket.on('disconnect', (socket)=> {
        console.log('Disconnected from client');
    });
});

server.listen(port, ()=> {
    console.log('Started at port ', port);
});