var express        	= require('express');
var app            	= express();
var httpServer		= require("https").createServer(app);
var io              = require('socket.io')(httpServer);
var driver             = require('./driver.js');
var pdriver             = require('./pdriver.js');
conf = {
    "port": 8081
}

httpServer.listen(conf.port);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/test', function(req, res) {
    res.send("Hallo");
    const state = db.getState()
    const str = JSON.stringify(state, null, 2)
    console.log(db);
    console.log(str);
});


app.get('/print', function (req, res) {
  res.send('Hello World!');
});
pdriver.read();


console.log('Server Läuft unter http://localhost:' + conf.port);






io.on('connection', function (socket) {
  socket.emit('news', { hello: 'noob' });
    
  socket.on('print', function (data) {
     
      console.log(data);
     
      
  });
});