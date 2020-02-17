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

io.on('connection', (socket) => {
    console.log('New web socket connection')    

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', 'A use has left')
    })

})

// Listen on port
server.listen(port, () => {
    console.log('Server started on port ', port)
})