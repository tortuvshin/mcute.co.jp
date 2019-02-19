var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model("Conversation", ConversationSchema);