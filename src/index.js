const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000


// Setup static directory to server
app.use(express.static(path.join(__dirname, '../public/html')))

// App get for route handling
app.get('/index', (req, res) => {
    res.render('index')
})

// Listen on port
app.listen(port, () => {
    console.log('Server started on port ', port)
})