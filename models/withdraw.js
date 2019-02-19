var mongoose = require('mongoose');

var WithdrawSchema = new mongoose.Schema({
    receiptID: String,
	status: String,
	type: String,
	paymentAccount: String,
	amount: Number,
	createTime: Date,
	acceptTime: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("Withdraw", WithdrawSchema);
	