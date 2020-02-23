const socket = io()

// Elements from the DOM $ convention
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('welcome', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    // Prevent default refresh
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // GETS e.target.elements.message the name from the form
     // Diable the form
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (message) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        // Enable the form
        console.log(`The message was deliverd ${message}`)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Upgrade your browser, as geolocaiton is not suported')
    }

    $sendLocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

        socket.emit('shareLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            $sendLocation.removeAttribute('disabled')
            console.log(`${message}`)
        })

    })
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})