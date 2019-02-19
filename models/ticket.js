var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {type: String, required: true},
    serviceType: {type: String, required: true},
    related: {
        kind: String,
        item: { type: mongoose.Schema.Types.ObjectId, refPath: 'related.kind' }
    },
    issueType: {type: String, required: true},
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MessageContent"
        }
    ],
    lastUpdate: {type: Date, required: true}
});

//for full text query using.
TicketSchema.index({
    sender:'text',
    status:'text',
    title:'text',
    department:'text',
    priority:'text',
    "related.kind":'text',
});

var autoPopulateUser = function(next) {
  this.populate({path:'sender',model:'User'});
  next();
};

TicketSchema.
  pre('findOne', autoPopulateUser).
  pre('find', autoPopulateUser);

module.exports = mongoose.model("Ticket", TicketSchema);