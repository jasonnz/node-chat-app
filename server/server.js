const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket)=> {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            console.log('params: ', params);
            return callback('Name and Room name are required!');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // socket.leave('Name of group');
        // io.emit -> io.to('Name of group').emit;
        // socket.broadcast.emit -> socket.broadcast.to('Name of group').emit
        // socket.emit

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback)=> {

        var user =  users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user[0].room).emit('newMessage', generateMessage(user[0].name, message.text, new Date().getTime()));
        }
        
        callback();
    });

    socket.on('createLocationMessage', (coords)=> {
        var user =  users.getUser(socket.id);
        if (user) {
            io.to(user[0].room).emit('newLocationMessage', generateLocationMessage(user[0].name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        
        console.log('socket.id ', socket.id);

        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room));
            io.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} has left.`));
        }

    });
});

server.listen(port, ()=> {
    console.log('Started at port ', port);
})