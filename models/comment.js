const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    replies: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "CommentReply"
        }
    ],
    submitDate: Date
});

module.exports = mongoose.model("Comment", CommentSchema);