const User = require('./models/user');
const Transaction = require('./models/transaction');
const Project = require('./models/project');
const Bid = require('./models/bid');
const PaypalDeposit = require("./models/paypalDeposit");
const Message = require("./models/message");
const CommentReply = require("./models/commentReply");
const Comment = require("./models/comment");
const BankDeposit = require("./models/bankDeposit");
const Rating = require("./models/rating");
const Ticket = require("./models/ticket");
const TicketContent = require("./models/ticketContent");

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