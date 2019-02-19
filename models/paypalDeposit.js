var mongoose = require('mongoose');

var PaypalDepositSchema = new mongoose.Schema({
    id: String,
	status: String,
	amount: Number,
	orderTime: Date,
	paymentTime: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("PaypalDeposit", PaypalDepositSchema);
	