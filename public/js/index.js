var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'juliablazey@gmail.com',
        text: 'Hey from julia this is a test!'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// custom
socket.on('newMessage', function(message) {
    console.log('Received a new message from the server: ', message);
});