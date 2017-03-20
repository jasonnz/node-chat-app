const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            console.log('params: ', params);
            callback('Name and Room name are required!');
        }

        socket.join(params.room);
        // socket.leave('Name of group');
        // io.emit -> io.to('Name of group').emit;
        // socket.broadcast.emit -> socket.broadcast.to('Name of group').emit
        // socket.emit

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback)=> {
        console.log('createMessage');
        io.emit('newMessage', generateMessage(message.from, message.text, new Date().getTime()));
        callback();
    });

    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', (socket)=> {
        console.log('Disconnected from client');
    });
});

server.listen(port, ()=> {
    console.log('Started at port ', port);
});