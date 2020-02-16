const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

// Setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

// App get for route handling
app.get('/index', (req, res) => {
    res.render('index')
})

let count = 0

io.on('connection', (socket) => {
    console.log('New web socket connection')

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count+=1
    //     // socket.emit('countUpdated', count) emits to connected client
    //     // io.emit emits to all
    //     io.emit('countUpdated', count)
    // })

    // socket.emit('welcome', 'Welcome to the web page')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

})

// Listen on port
server.listen(port, () => {
    console.log('Server started on port ', port)
})