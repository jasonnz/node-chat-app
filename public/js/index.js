var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// custom
socket.on('newMessage', function(message) {
    console.log('Received a new message from the server: ', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    console.log('Received a new location from the server: ', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi there!'
}, function(data) {
    console.log('Got the ack: ', data);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = $('[name=message]');


    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        text: messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) return alert('geolocation not supported by your browser');

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(postion) {
        // console.log(postion);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
        });

    }, function() {
         alert('Unable to fetch location');
    });

});