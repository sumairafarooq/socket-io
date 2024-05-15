var app = require('express')(); //use express framework and app variable will hold our Express application.
var http = require('http').Server(app); //creating an HTTP server using the http module, and passing our Express app to it. This ties the Express application to the server.

var path =require('path'); //helps in working with file and directory paths

var io = require('socket.io')(http);// passing server http to socket

app.get('/', function(req, res){ 
    var options = {
        root: path.join (__dirname)//the directory where this script resides
    }
    var filename = 'index.html';// to load our index.html
    res.sendFile(filename,options);
});
var roomno = 1;
var full = 0;
/////**********server side connection/disconnection */
io.on('connection', function(socket){
    console.log('A user connected');

    socket.join("room-"+roomno); //room created

    io.sockets.in("room-"+roomno).emit('connectedRoom', "You Are Connected to room no. "+roomno); // event fired
    full++;
    if(full >= 2){
        full = 0;
        roomno++;
    }
    socket.on('disconnect', function(){
        console.log('A user disconnected')
    });
});
////////******************************************* */


http.listen(3000, function(){ //3000 is port 
    console.log('Serverrrrr is ready on 3000')
});