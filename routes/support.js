var express = require('express'),
	app = express(),
	router = express.Router(),
	User = require('../models/user'),
	Project = require('../models/project'),
	Ticket = require("../models/ticket"),
	TicketContent = require("../models/ticketContent"),
	BankDeposit = require("../models/bankDeposit"),
	PaypalDeposit = require("../models/paypalDeposit"),
	multer  = require('multer'),
	mkdirp = require('mkdirp'),
	mime = require('mime'),
	upload = require("../middleware/upload"),
	fs = require("fs"),
	passport = require("passport"),
	middleware = require("../middleware/index");
	

router.get("/", middleware.jwt, function(req, res){

    Ticket.find().sort("-lastUpdate").populate({path: 'messages', model: "TicketContent"}).exec(function(err,tickets){
        if (err){
            console.log(err);
        } else{
            res.status(200).json({tickets: tickets});
        }
    });
});

router.get("/create", middleware.jwt, function(req, res){
    User.findById(req.user._id).populate("projects").populate({path: "transaction", model: "Transaction", populate: {path: "bankDeposit", model: "BankDeposit"}}).populate({path: "transaction", model: "Transaction", populate: {path: "paypalDeposit", model: "PaypalDeposit"}}).populate({path: "transaction", model: "Transaction", populate: {path: "withdraws", model: "Withdraw"}}).exec(function(err, user){
        var projects = [];
        user.projects.forEach(function(project){
            if (project.status ===  'working' || project.status ===  'finished' ){
                projects.push(project);
            }
        })
        res.status(200).json({projects: projects, transaction: user.transaction});
    })
});

router.post("/create", [middleware.jwt, upload.temp().any()], function(req, res){
    var data = JSON.parse(req.body.ticket);
    data.files = req.files;
    data.status = 'under for review';
    data.sender = req.user;
    data.lastUpdate = new Date();

    
    if (data.serviceType == "project"){
        Project.findById(data.relatedService).populate({path: 'winBid', model: 'Bid', populate: { path: 'bidder', model: 'User'}}).exec(function(err, project){
            data.related = {
                kind: "Project",
                item: project
            }
            data.freelancer = project.winBid.bidder;
            createTicket(data, res);
        });
    }else if (data.serviceType == "billing"){
        BankDeposit.findById(data.relatedService, function(err, bankdeposit){
          if (err){
              console.log(err);
          } else if (!bankdeposit){
              PaypalDeposit.findById(data.relatedService, function(err, paypaldeposit){
                    if (err){
                        console.log(err);
                    }else{
                        data.related = {
                            kind: "PaypalDeposit",
                            item: paypaldeposit
                        }
                        createTicket(data, res);
                    }
              });
          } else {
                data.related = {
                    kind: "BankDeposit",
                    item: bankdeposit
                }
                createTicket(data, res);
          }
        });
    }
});

router.post("/:id/reply", [middleware.jwt,upload.temp().any()], function(req, res){
    var message = req.body.message;
    Ticket.findById(req.params.id).populate('sender').exec(function(err, ticket){
        if (err){
            console.log(err);
        } else {
            if (ticket.serviceType === 'project'){
                if (req.user._id === ticket.sender._id ){
                    ticket.status = "Employer Replied";
                } else {
                    ticket.status = "Freelancer Replied";
                }
            } else if (ticket.serviceType === 'billing'){
                ticket.status = "Replied"
            }
            
            var currentDate = new Date();
            ticket.lastUpdate = currentDate;
    
            ticket.save(function(err, ticket){
                var data = {
                     sender: req.user,
                     sendDate: currentDate,
                     message: message,
                     attachments: req.files,
                     ticket: ticket
                }
                TicketContent.create(data, function(err, ticketContent){
                    if (err){
                        console.log(err);
                    } else {
                        ticket.messages.push(ticketContent);
                        ticket.save(function(err, ticket){
                            var dir = './public/uploads/' + ticket.sender.username + '/tickets/' + ticket._id + "/" + ticketContent._id;
                            mkdirp(dir, function (err) {
        			            if (err) {
        			            	console.error(err)
        			            }else {
                                    data.attachments.forEach(function(file){
        			            		var oldPath = file.path;
        			            		var newPath = dir + '/' + file.filename;
        			            		fs.rename(oldPath, newPath);
        			            	});
        			            }
                            });
                            res.status(200).json({
                                success: true,
                                message: "Replied successfully"
                            });
                        });
                    }
                });
            });
        }    
    });
});

router.get("/:id", middleware.jwt, function(req, res){
    Ticket.findById(req.params.id).populate({path: "sender", model: "User"}).populate({path: "messages", model: "TicketContent", populate: {path: "sender", model: "User"}}).populate('related.item').exec(function(err, ticket){
        if (err){
            console.log(err);
        } else {
            if (!ticket){
                return res.status(400).json({message: 'The ticket is not exist'});
            }
            res.status(200).json({ticket: ticket});
        }
    });
});

function createTicket(data, res){
    console.log("IN create ticket");
    Ticket.create(data, function(err, ticket){
       if (err){
           console.log(err);
       } else {
            var TicketContentdata = {
                sender: ticket.sender,
                sendDate: ticket.lastUpdate,
                message: data.message,
                ticket: ticket,
                attachments: data.files
            }
            TicketContent.create(TicketContentdata, function(err, ticketContent){
                ticket.messages.push(ticketContent);
                ticket.save(function(err, ticket){
                    User.findById(ticket.sender._id, function(err, user){
                        user.tickets.push(ticket);
                        user.save(function(err, user){
                            var dir = './public/uploads/' + user.username + '/tickets/' + ticket._id + '/' + ticketContent._id;
                            mkdirp(dir, function (err) {
                                TicketContentdata.attachments.forEach(function(file){
    			            		var oldPath = file.path;
    			            		var newPath = dir + '/' + file.filename;
    			            		fs.rename(oldPath, newPath);
    			            	});
                            });
                            res.status(200).json({ 
                                success: true,
                                message: "Ticket submitted successfully",
                                ticketId: ticket._id
                            });
                        });
                    });
                });
            });
       }
    });
}

module.exports = router;