const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/toDoList2', {useNewUrlParser: true});

require('./sockets/todo-socket')(io);
require('./routes/html')(app);
require('./routes/api')(app);

server.listen(PORT, () => {
    console.log('Server is listening')
})