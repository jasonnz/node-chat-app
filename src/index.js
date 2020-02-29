const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)
const { generateMessage } = require('./utils/messages')

// Setup static directory to server
app.use(express.static(path.join(__dirname, '../public')))

// App get for route handling
app.get('/index', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (message, callback) => {
        
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(message))
        callback('All good ACKd')
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit(generateMessage('message', 'A use has left'))
    })

    socket.on('shareLocation', (message, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${message.latitude},${message.longitude}`)
        callback('Location shared!')
    })
})

// Listen on port
server.listen(port, () => {
    console.log('Server started on port ', port)
})