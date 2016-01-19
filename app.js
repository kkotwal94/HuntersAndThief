var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8080;
var express = require('express');
var path = require('path');

//app.use(express.static(path.join(__dirname, 'chat_app')));
//setting up our port
http.listen(port, function() {
console.log('Server is listening on port... ' + port);
});

//usernames connected to the chat
var usernames = {};
var numUsers = 0;
var rooms = ['Lobby','Dota 2 Chat','Joke Chat'];
var lobby = [];
var readyStatus = {};

var clients = {};
var blueplayer = {};
var redplayer = {};
var blueplayerName;
var redplayerName;
var redinit = false;
var blueinit = false;
//routing to our index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname +'/'));



//socket io, connected pls, server stuff
io.on('connection', function(socket) {
  console.log("User has connected");
  socket.on('adduser', function(username) {
    socket.username = username;
    clients[socket.username] = {id: socket.id, username: socket.username};
    //adding our name to the global scope
    //console.log(username);
    socket.room = 'Lobby';
    usernames[username] = username;
    io.emit('updateusers', usernames);
    //usernames[username] = socket;
    //say this user has connected to client
    socket.join('Lobby');
    numUsers++;
    socket.broadcast.emit('chat message', socket.username + ' has connected to the chat!')
    socket.emit('updaterooms',rooms,'Lobby');
    //socket.emit('lobbyfull', lobby);
    //socket.emit('readyComplete', readyStatus);
    //socket.emit('unreadyComplete', readyStatus);
});

  
socket.on('updateLobby', function(username) {
    if(lobby.length < 2) {
        lobby.push(username); //set a member in the lobby to be that username
        console.log(lobby);
        io.sockets.emit('updatingLobby', lobby, readyStatus);
        
    }
    
    else {
        socket.emit('lobbyfull', lobby);
       
    }
});

socket.on('leaveLobby', function() {
    for(var i = 0; i < lobby.length; i++) {
        if(socket.username == lobby[i]) {
            lobby.splice(i, 1);
        }
    }
    io.sockets.emit('lobbyfull', lobby); //emit to all sockets
    
});

socket.on('changenickname', function(new_username) {
   var temp;
   temp = usernames[socket.username];
   delete usernames[socket.username];
   socket.username = new_username;
   usernames[new_username] = new_username;
   io.emit('updateusers', usernames);
   //usernames[new_username] = socket;
   io.emit('chat message', temp +' has changed his name to ' + socket.username)
	});

  socket.on('chat message', function(msg) {
   io.sockets.in(socket.room).emit('chat message', socket.username + ': '+ msg); 
});

socket.on('ready', function(name) {
    readyStatus[name] = {name: name, ready: true};
    console.log("server was hit!");
    io.sockets.emit('readyComplete', readyStatus);
});

socket.on('unready', function(name) {
    readyStatus[name] = {name: name, ready: false};
    io.sockets.emit('unreadyComplete', readyStatus);
});
  
socket.on('initGame', function(player1, player2) {
    var p1 = clients[player1].id;
    var p2 = clients[player2].id;
    blueplayerName = player1;
    redplayerName = player2;
    
    blueplayer[player1] = {name: player1, hasWon: false, hasLost: false, isTurn: false, initStage: true, locations: null};
    redplayer[player2] = {name: player2, hasWon: false, hasLost: false, isTurn: false, initStage: true, locations: null};
   
    
   io.sockets.connected[p1].emit('blueplayerinit', blueplayer[player1]); 
   io.sockets.connected[p2].emit('redplayerinit', redplayer[player2]);
    
});

socket.on('finishedInit', function(locations, playerName) {
    if(locations['init'] == "redtrue")  {
        redinit = true;
        locations['name'] = playerName;
        redplayer[playerName].locations = locations;
        io.sockets.connected[clients[playerName].id].emit('waitFinishInit');
    }  
    
    if(locations['init'] == "bluetrue") {
        blueinit = true;
        locations['name'] = playerName;
        blueplayer[playerName].locations = locations;
        blueplayer[playerName].name = playerName;
        io.sockets.connected[clients[playerName].id].emit('waitFinishInit');
        
    }
    
    if((redinit == true) && (blueinit == true)) {
        var blueloc = blueplayer[blueplayerName].locations;
        var redloc = redplayer[redplayerName].locations;
        
        var blueId = clients[blueplayerName].id;
        var redId = clients[redplayerName].id;
        
        io.sockets.emit('redPlayerInitLoad', redloc);
        io.sockets.emit('bluePlayerInitLoad', blueloc);
        
        //io.sockets.connected[blueId].emit('redPlayerInitLoad', redloc);
        //io.sockets.connected[redId].emit('bluePlayerInitLoad', blueloc);
        
        redinit = false;
        blueinit = false;
        
    }
});


  socket.on('disconnect', function() {
    //removes the username from global array of username
    delete usernames[socket.username];
    numUsers--;
    for(var i =0; i<lobby.length;i++){
        if(socket.username == lobby[i]){
            lobby.splice(i,1);
        }
    }
    io.sockets.emit('lobbyfull', lobby); //emit to all sockets
    //update list of users in chat, client side
    io.emit('updateusers', usernames);
    //tell chat room user has left
    socket.broadcast.emit('chat message', socket.username + ' has disconnected');
    socket.leave(socket.room);
});

   socket.on('getUsers', function() {
	socket.emit('updateusers', usernames);
	});

});

