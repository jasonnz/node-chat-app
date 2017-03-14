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
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('Received a new location from the server: ', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a  = $('<a target="_blank">My current location</a>');
    
    li.text(`${message.from} ${formattedTime}: `);
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