var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
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