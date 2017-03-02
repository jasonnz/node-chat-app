const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//    res.send(200);
// });

app.use(express.static(publicPath));

app.listen(port, ()=> {
    console.log('Started at port ', port);
});