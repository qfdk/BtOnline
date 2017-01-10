// ----------------Configure--------------------
// var config = require('./config.js')
// ---------------Environnement-----------------
var app = require('express')()
var server = require('http').Server(app)
// var io = require('socket.io')(server)
var path = require('path')
var favicon = require('serve-favicon')
// ------------------------------------------------
// -----------------INITIALISATION-----------------
// ------------------------------------------------
// var sockets = []; // Liste des sockets client

// ------------express-------------------
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(require('express').static(path.join(__dirname, 'public')))
server.listen(3000)
console.log('Server on 3000; http://localhost:3000')

// -----------------index-----------------
//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'GET,PUT, POST');
  if (req.method == 'OPTIONS') {
    /*让options请求快速返回*/
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/getVideo',function(req,res){
  res.render('index')
})