var mongoose = require('mongoose');

var TicketContentSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sendDate: {type: Date, required: true},
    message:{type: String, required: true},
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    attachments: [
        {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number 
        }
    ]
});

module.exports = mongoose.model("TicketContent", TicketContentSchema);