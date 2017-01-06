// ----------------Configure--------------------
const config = require('./config.js');
// ---------------Environnement-----------------
var url = require('url');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var favicon = require('serve-favicon');
// ------------------------------------------------
// -----------------INITIALISATION-----------------
// ------------------------------------------------
var sockets = []; // Liste des sockets client

// ------------express-------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('express').static(path.join(__dirname, 'public')));
server.listen(3000);
console.log('Server on 3000; http://localhost:3000')

// -----------------index-----------------
app.get('/', function (req, res) {
    res.render('index');
});