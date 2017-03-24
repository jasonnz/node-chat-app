var socket = io();

var scrollToBottom = function() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('Should Scroll');
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    // console.log('Connected to server');
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    // console.log('User List', users);
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);

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
    scrollToBottom();
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
    scrollToBottom();
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi there!'
// }, function(data) {
//     console.log('Got the ack: ', data);
// });

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = $('[name=message]');


    socket.emit('createMessage', {
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