var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recevier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model("Message", MessageSchema);