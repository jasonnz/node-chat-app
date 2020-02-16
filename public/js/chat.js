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
    console.log('Did it run! ', message)
    socket.emit('sendMessage', message)
})

socket.on('message', (message) => {
    console.log(message)
})