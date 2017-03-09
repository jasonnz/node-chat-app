var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'juliablazey@gmail.com',
    //     text: 'Hey from julia this is a test!'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// custom
socket.on('newMessage', function(message) {
    console.log('Received a new message from the server: ', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi there!'
}, function(data) {
    console.log('Got the ack: ', data);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});