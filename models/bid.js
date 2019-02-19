var mongoose = require('mongoose');

var BidSchema = new mongoose.Schema({
	bidder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	bidPrice: Number,
	bidDate: Date,
	bidProject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
	}
});

module.exports = mongoose.model("Bid", BidSchema);