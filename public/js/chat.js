const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated ' + count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

socket.on('welcome', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    // Prevent default refresh
    e.preventDefault()
 
    // GETS e.target.elements.message the name from the form
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (message) => {
        console.log(`The message was deliverd ${message}`)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Upgrade your browser, as geolocaiton is not suported')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            console.log(`${message}`)
        })

    })
})

socket.on('message', (message) => {
    console.log(message)
})