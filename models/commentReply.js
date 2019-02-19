var mongoose = require('mongoose');

var CommentReplySchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    submitDate: Date
});

module.exports = mongoose.model("CommentReply", CommentReplySchema);