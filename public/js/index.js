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

socket.on('newLocationMessage', function(message) {
    console.log('Received a new location from the server: ', message);
    var li = $('<li></li>');
    var a  = $('<a target="_blank">My current location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) return alert('geolocation not supported by your browser');

    navigator.geolocation.getCurrentPosition(function(postion) {
        console.log(postion);

        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        }, function() {

        });

    }, function() {
         alert('Unable to fetch location');
    });

});