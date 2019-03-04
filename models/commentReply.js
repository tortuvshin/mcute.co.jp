const mongoose = require('mongoose');

const CommentReplySchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    submitDate: Date
});

module.exports = mongoose.model("CommentReply", CommentReplySchema);