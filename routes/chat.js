var express = require('express'),
	app = express(),
	router = express.Router(),
	middleware = require("../middleware/"),
	Conversation = require('../models/conversation'),
	Message = require('../models/message'),
	User = require('../models/user'),
	io = require("../sockets/").io(),
	currentUsers = require("../sockets/").getCurrentUsers();
	
router.post("/", middleware.jwt, function(req, res){
    const recevier = req.body.recevier;
    const sender = req.user;
    const message = req.body.message;
    
    Conversation.findOne({ users: { "$in": [ recevier._id, sender._id ] }}, function(err, foundConversation){
        if (!foundConversation){
            Conversation.create({users: [recevier, sender]}, function(err, createdConversation){
                 addMessage(message, sender, recevier, createdConversation, res);
            });
        } else {
            addMessage(message, sender, recevier, foundConversation, res);
        }
    });
});

router.get("/conversation/messages", middleware.jwt, function(req, res){
    var sender_id = req.query.sender_id;
    var recevier_id = req.query.recevier_id;
    
    Conversation.findOne({ users: { "$in": [ sender_id, recevier_id ]}}, 'messages').populate({path: 'messages', model: 'Message', populate: {path: 'sender', model: 'User'}}).exec(function(err, foundConversationMessages){
        res.status(200).json({messages: foundConversationMessages});
    });
});

router.get("/", middleware.jwt, function(req, res){
    Conversation.find({ users: { "$in": [ req.user._id ] }}).sort({updated_at:1}).populate({path: 'users', model: 'User'}).populate({path: 'messages', model: 'Message'}).exec(function(err, foundConversations){
         res.status(200).json({ success: true, conversations: foundConversations });
    });
});

router.get("/user/:username", middleware.jwt, function(req, res){
    User.findOne({username: req.params.username}, 'firstName lastName username _id',function(err, foundUser){
        res.status(200).json({ success: true, target: foundUser });
    });
});

function addMessage(message, sender, recevier, conversation, res){
    Message.create({
        message: message,
        sender: sender,
        recevier: recevier,
        created_at: new Date
    }, function(err, createdMessage){
         conversation.messages.push(createdMessage);
         conversation.updated_at = new Date();
         conversation.save(function(err, savedConversation){
            var conversationUsers = currentUsers.filter(function(socket){
                                         return String(socket.user) === String(sender._id) || String(socket.user) === String(recevier._id);
                                    });
            
            console.log(conversationUsers.length);
                                    
            conversationUsers.forEach(function(socket){
                io.sockets.connected[socket.id].emit("addMessage", createdMessage);
                io.sockets.connected[socket.id].emit("reloadChats");
            });
            
            res.status(200).json({ success: true }) 
         });
    });
}

module.exports = router;