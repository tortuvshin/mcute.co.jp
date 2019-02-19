var mongoose = require('mongoose');

var BankDepositSchema = new mongoose.Schema({
	status: String,
	bankType: String,
	amount: Number,
	depositTime: Date,
	submissionTime: Date,
	approvalTime: Date,
	receipt: {
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number 
    },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("BankDeposit", BankDepositSchema);
	