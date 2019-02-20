var User = require('./models/user');
var Transaction = require('./models/transaction');
var Project = require('./models/project');
var Bid = require('./models/bid');
var PaypalDeposit = require("./models/paypalDeposit");
var Message = require("./models/message");
var CommentReply = require("./models/commentReply");
var Comment = require("./models/comment");
var BankDeposit = require("./models/bankDeposit");
var Rating = require("./models/rating");
var Ticket = require("./models/ticket");
var TicketContent = require("./models/ticketContent");



function seedDB(){
    Rating.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Rating data have been removed");
            }
    });
    Ticket.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Ticket data have been removed");
            }
    });
    TicketContent.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("TicketContent data have been removed");
            }
    });
    User.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("User data have been removed");
            }
    });
    
    Transaction.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Transaction data have been removed");
            }
    });
    
    Project.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Project data have been removed");
            }
    });
    
    Bid.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Bid data have been removed");
            }
    });
    
    PaypalDeposit.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("PaypalDeposit data have been removed");
            }
    });
    Message.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Message data have been removed");
            }
    });
    CommentReply.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("CommentReply data have been removed");
            }
    });
    Comment.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("Comment data have been removed");
            }
    });
    BankDeposit.remove({}, function(err){
            if (err){
                console.log(err);
            } else {
                console.log("BankDeposit data have been removed");
            }
    });
}

module.exports = seedDB;