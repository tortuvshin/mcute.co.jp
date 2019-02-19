var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  bankDeposit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      rel: "BankDeposit"
    }
  ],
  paypalDeposit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      rel: "PaypalDeposit"
    }
  ],
  withdraws: [
    {
      type: mongoose.Schema.Types.ObjectId,
      rel: "Withdraw"
    }
  ]
});

module.exports = mongoose.model("Transaction", TransactionSchema);