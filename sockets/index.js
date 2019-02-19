var express = require('express'),
  	app = express(),
    http = require('http').Server(app),
  	sio = require('socket.io'),
  	io = null;
	
var CurrentUsers = [];

exports.io = function () {
  return io;
};

exports.initialize = function(server) {
    io = sio(server);
    
    io.on('connection', function(socket){
    	CurrentUsers.push(socket);
    	
    	socket.emit("CONNECTED", socket.id);
    	
    	socket.on("payment", function(data){
    		 CurrentUsers.forEach(function(CurrentUser){
    		    if (CurrentUser.id == socket.id){
    		      CurrentUser.urlPath = data.urlPath;
    		      return false;
    		    }
    		 });
    	});
    	
    	socket.on("initialize", function(data){
    		 socket.user = data;
    	});

    	socket.on('disconnect', function() {
          var i = CurrentUsers.indexOf(socket);
          CurrentUsers.splice(i, 1);
        });
    });
};

exports.getCurrentUsers = function(){
    return CurrentUsers;
}