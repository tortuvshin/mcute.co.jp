const User = require('../models/user'),
	randtoken = require('rand-token'),
	PaypalDeposit = require('../models/paypalDeposit'),
	BankDeposit = require('../models/bankDeposit'),
    Withdraw = require('../models/withdraw'),
    Paypal = require('paypal-express-checkout'),
    paypal_url = require("../config/paypal"),
	io = require("../sockets/").io();
    
const paypal = Paypal.init('#', '#', '#', paypal_url.paypalSuccess, paypal_url.paypalCancel, true);

module.exports = {
    deposit(req, res){
        if (req.body.method === "paypal"){
            const invoiceNo = randtoken.generate(20);
            const amount = Number(req.body.amount);
            console.log(amount);
            const description = "Deposit to MCute";
            const currency = "HKD";
            let requireAddress = false;
            const socketid = req.body.socketID;

            paypal.pay(invoiceNo, amount, description, currency, requireAddress, function(err, url) {
                if (err) {
                    console.log(err);
                    return;
                }
                let data = {
                    id: invoiceNo,
                    status: "Waiting for paid",
                    amount: amount,
                    orderTime: new Date(),
                    user: req.user
                }
                PaypalDeposit.create(data, function(err,data){
                    if (err){
                        console.log(err);
                    } else {
                        User.findById(req.user._id).populate({path: "transaction", model: "Transaction"}).exec(function(err, user){
                            if (err){
                                console.log(err);
                            } else {
                                user.transaction.paypalDeposit.push(data);
                                user.transaction.save(function(err,data){
                                    if (err){
                                        console.log(err);
                                    } else {
                                        io.sockets.connected[socketid].invoiceNo = invoiceNo;
                                    
                                        res.status(200).json({status: 'Waiting for Payment', data: {invoiceNo: invoiceNo, paymentUrl: url}});
                                    }
                                });
                            }	
                        });
                    }
                });
            });
        } else if (req.body.method === "bank"){
            const bankType = req.body.bankType;
            const amount = req.body.amount;
            const depositDate = req.body.date;
            const depositTime = req.body.time;
            
            console.log(req.files.length);
            
            let data = {
                status: "Waiting for approval",
                bankType: bankType,
                amount: amount,
                depositTime: new Date(req.body.date + "T" +  req.body.time),
                submissionTime: new Date(),
                receipt: {},
                user: req.user
            }
            
            if (req.files.length === 1){
                data.receipt = req.files[0];
            }
            
            BankDeposit.create(data, function(err,data){
                    if (err){
                        console.log(err);
                    } else {
                        User.findById(req.user._id).populate("transaction").exec(function(err, user){
                            if (err){
                                console.log(err);
                            } else {
                                user.transaction.bankDeposit.push(data);
                                user.transaction.save(function(err,data){
                                    if (err){
                                        console.log(err);
                                    } else{
                                        res.json({success: true, message: "We have recevied your deposit request. Please wait for approval."});
                                    }
                                });
                            }	
                        });
                    }
            });
        }
    },

    withdraw(req, res){
        let data = {
            type:  req.body.type,
            amount: req.body.amount,
            paymentAccount: req.body.paymentAccount,
            status: 'Waiting for approval',
            createTime: new Date(),
            user: req.user
        }
        
        if (req.user.balance < req.body.amount){
            return 	res.status(400).json({message: 'Your request amount is exceed your account balance.'})
        }
        ;
        Withdraw.create(data, function(err, createdWithdraw){
            User.findById(req.user._id).populate({path: 'transaction', model: 'Transaction'}).exec(function(err, user){
                user.transaction.withdraws.push(createdWithdraw);
                user.transaction.save(function(err){
                    res.status(200).json({message: 'Withdraw request created, please wait for approvel'})	
                })
            });
        });
    },

    billingReturn(req, res){
        const token = req.query.token;
        const PayerID = req.query.PayerID;

        paypal.detail(token, PayerID, function(err, data, invoiceNumber, price) {

        if (err) {
            console.log(err);
            return;
        }

        if (data.success){
            User.findById(req.user._id, function(err, user){
                if (err){
                    console.log(err);
                } else {
                    user.balance += Number(price);
                    user.save(function(err, saveUser){
                        if (err){
                            console.log(err);
                        } else {
                            PaypalDeposit.findOne({id: invoiceNumber}, function(err, transaction){
                                transaction.paymentTime = new Date(data.PAYMENTINFO_0_ORDERTIME);
                                transaction.status = "Success";
                                transaction.save(function(err, data){
                                    if (err){
                                        console.log(err);
                                    }
                                    const socketid = getSocketId(invoiceNumber);
                                    console.log(saveUser);
                                    io.sockets.connected[socketid].emit("paymentRecieved", {status: "Payment Received", updatedUser: saveUser});
                                    
                                    res.status(200).json();
                                });
                            });
                        }	
                    });
                }	 
            });
            
        }else{
            console.log('SOME PROBLEM:', data);
        }
        
        });
    },


    transaction(req, res){
        const getBankDeposit = new Promise((resolve, reject)=> {
            BankDeposit.find({user: req.user}).sort({'submissionTime': 1}).exec(function(err, bankDeposits){
                resolve(bankDeposits);
            });
        });
        const getPaypalDeposit = new Promise((resolve, reject) => {
            PaypalDeposit.find({user: req.user}).sort({'orderTime': 1}).exec(function(err, paypalDeposits){
                resolve(paypalDeposits);
            });
        });
        const getWithdraw = new Promise((resolve, reject)=>  {
            Withdraw.find({user: req.user}).sort({'createTime': 1}).exec(function(err, withdraws){
                resolve(withdraws);
            })	
        });
        
        Promise.all([getBankDeposit,getPaypalDeposit,getWithdraw]).then(values => { 
            res.status(200).json({bankDeposits: values[0], paypalDeposits: values[1], withdraws: values[2]});
        });
        
    }
}