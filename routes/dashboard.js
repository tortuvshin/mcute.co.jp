var express = require('express'),
	app = express(),
	User = require('../models/user'),
	router = express.Router(),
	middleware = require("../middleware/"),
	Paypal = require('paypal-express-checkout'),
	randtoken = require('rand-token'),
	Transaction = require('../models/transaction'),
	PaypalDeposit = require('../models/paypalDeposit'),
	BankDeposit = require('../models/bankDeposit'),
	Withdraw = require('../models/withdraw'),
	Bid = require('../models/bid'),
	Project = require('../models/project'),
	io = require("../sockets/").io(),
	currentUsers = require("../sockets/").getCurrentUsers(),
	striptags = require('striptags'),
	upload = require("../middleware/upload"),
	paypal_url = require("../paypal");
	

var paypal = Paypal.init('s20081428-facilitator_api1.gmail.com', 'R72DVPDQUL2GJC8Z', 'AFcWxV21C7fd0v3bYYYRCpSSRl31A5iBT42og6dVd8WcEbfHabBWj98g', paypal_url.paypalSuccess, paypal_url.paypalCancel, true);
var files = [];

// ===================================
// DASHBOARD ROUTE
// ===================================
router.get("/", middleware.jwt, function(req, res){
	User.findById(req.user._id).populate({path: 'transaction',populate: { path: 'bankDeposit', model: 'BankDeposit'}}).populate({path: "projects", model: "Project"}).populate({path:"projects", populate: {path: "winBid", model:"Bid", populate: {path: "bidder", model: "User"}}}).exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
        	if (req.user.type === "freelancer"){
				var outputProject = {
			    	bids: [],
			    	working: [],
			    	past: []
			    };
				Bid.find({bidder: req.user}).populate({path:"bidProject", model: "Project"}).populate("bidder").populate({path:"bidProject", model: "Project", populate: {path: "bids", model:"Bid"}}).exec(function(err, bids){
					bids.forEach(function(bid){
						if (bid.bidProject.status === "open"){
				    		bid.bidProject.description = striptags(bid.bidProject.description);
							outputProject.bids.push(bid);
						}
					});
					
					User.findById(req.user._id).populate("projects").populate({path: "projects", model:"Project", populate: {path:"winBid", model:"Bid" , populate: {path: "bidder", model: "User"}}}).populate({path: "projects", populate: {path:"provider", model:"User"}}).exec(function(err, user){
						user.projects.forEach(function(project){
							if (project.status === "in progress"){
								project.description = striptags(project.description);
								outputProject.working.push(project);
							}else if (project.status === "finished"){
								project.description = striptags(project.description);
								outputProject.past.push(project);
							}	
						});
						res.render("./dashboard/index", {transaction: foundUser.transaction,projects: outputProject});
					});
				});
			}else if (req.user.type === "employer"){
	        	foundUser.projects.forEach(function(project){
	        		project.description = striptags(project.description);
	        	});
	            res.render("./dashboard/index", {transaction: foundUser.transaction, projects: foundUser.projects});
			}
        }
    });
});

router.put("/profile", [middleware.jwt, upload.default("avatar").any()], function(req, res){
	if (req.files){
		if (req.files.length === 1){
			req.body.avatar = req.files[0];
		}
	}
	req.files= [];
	User.findByIdAndUpdate(req.user._id, req.body, {new: true}, function(err, user){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured.'});
		}
		var updatedUser = {
	        type: user.type,
	        firstName: user.firstName,
	        lastName: user.lastName,
	        country: user.country,
	        avatar: user.avatar,
	        email: user.email,
	        username: user.username,
	        balance: req.user.balance
	    };
		return res.status(200).json({
				success: true, 
				message: "The personal Information updated successfully!",
				updatedUser: updatedUser
		});
	});
});


router.put("/security", middleware.jwt, function(req, res){
	var currentPassword = req.body.currentPassword;
	var newPassword = req.body.newPassword;
	var repeatPassword = req.body.repeatPassword
	
	if (newPassword !== repeatPassword){
		return res.status(400).json({success: false, message: "The new password is not match."});
	}
	
	req.user.comparePassword(currentPassword, function(err, isMatch){
		if (!isMatch){
			return res.status(400).json({success: false, message: "The current password is wrong."});
		}
		req.user.password = newPassword;
		req.user.save(function(err, saveUser){
			res.status(200).json({success: true, message: "Your password has been changed."});
		});
	});
});


router.post("/billing/deposit/", [middleware.jwt, upload.default("bankdeposit").any()], function(req, res){
	if (req.body.method === "paypal"){
		var invoiceNo = randtoken.generate(20);
		var amount = Number(req.body.amount);
		console.log(amount);
		var description = "Deposit to ECJob.com";
		var currency = "HKD";
		var requireAddress = false;
		var socketid = req.body.socketID;

		paypal.pay(invoiceNo, amount, description, currency, requireAddress, function(err, url) {
		    if (err) {
		        console.log(err);
		        return;
		    }
		    var data = {
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
		var bankType = req.body.bankType;
		var amount = req.body.amount;
		var depositDate = req.body.date;
		var depositTime = req.body.time;
		
		console.log(req.files.length);
		
		var data = {
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
});

router.post("/billing/withdraw", middleware.jwt, function(req, res){
	var data = {
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
});

router.get("/billing/return", middleware.jwt, function(req, res){
	var token = req.query.token;
	var PayerID = req.query.PayerID;

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
				        		var socketid = getSocketId(invoiceNumber);
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
});


router.get("/billing/transaction", middleware.jwt, function(req, res){
	var getBankDeposit = new Promise((resolve, reject)=> {
		BankDeposit.find({user: req.user}).sort({'submissionTime': 1}).exec(function(err, bankDeposits){
			resolve(bankDeposits);
		});
	});
	var getPaypalDeposit = new Promise((resolve, reject) => {
		PaypalDeposit.find({user: req.user}).sort({'orderTime': 1}).exec(function(err, paypalDeposits){
			resolve(paypalDeposits);
		});
	});
	var getWithdraw = new Promise((resolve, reject)=>  {
		Withdraw.find({user: req.user}).sort({'createTime': 1}).exec(function(err, withdraws){
			resolve(withdraws);
		})	
	});
	
	Promise.all([getBankDeposit,getPaypalDeposit,getWithdraw]).then(values => { 
		  res.status(200).json({bankDeposits: values[0], paypalDeposits: values[1], withdraws: values[2]});
	});
	
});

router.get("/project", middleware.jwt, function(req, res){
	var status = req.query.status;
	var keyword = req.query.keyword;
	var limitRows = parseInt(req.query.rowNumber);
	var skipRows = (parseInt(req.query.pageNumber) - 1) * limitRows;
	
	if (req.user.type === "employer"){
		var condition = {
		    $and:[
		    	{employer: req.user._id},
		        {title: new RegExp(keyword, 'i')},
		        {status: status}
		    ]
		}
		
		var sort = {}
		
		if (status === 'working'){
			sort.chosenDate = 1;
		}else {
			sort.endDate = 1;
		}
		
		Project.find(condition).sort(sort).skip(skipRows).limit(limitRows).populate({path: 'bids', model: 'Bid', populate: { path: 'bidder', model: 'User'}}).populate({path: "winBid", model: 'Bid', populate: {path: "bidder", model: "User"}}).exec(function(err, projects){
			Project.count(condition, function(err, count){
				var output = [];
					projects.forEach(function(project){
				        project.description = striptags(project.description);
				        output.push(project);
				    });
				    res.status(200).json({projects: output, totalProjectCount: count});
			});
	    });

	}else if (req.user.type === "freelancer"){
		var output = [];
		if (status === 'bidding'){
			Bid.find({bidder: req.user}).populate({
				path:"bidProject", 
				model: "Project", 
				match: { status: 'open', title: new RegExp(keyword, 'i')}
				, populate: {path: 'employer', model: 'User'}
			}).sort({'bidProject.endDate' : 1}).exec(function(err, bids){
				bids = bids.filter(function(bid) {
					return bid.bidProject !== null && bid.bidProject.title !== null;	
				});
				var totalProjectCount = bids.length;
				console.log(totalProjectCount);
				bids = bids.slice(skipRows, req.query.pageNumber * limitRows );
				bids.forEach(function(bid){
					bid.bidProject.description = striptags(bid.bidProject.description);	
				});
				res.status(200).json({bids: bids, totalProjectCount: totalProjectCount});
			});
		} else {
			var sort = {}
			if (status === 'working'){
				sort['project.chosenDate'] = 1;
			}else if (status === 'finished'){
				sort['project.finishDate'] = 1;
			}
			User.findById(req.user._id).populate({path:"projects", match: { title: new RegExp(keyword, 'i'), status: status }, populate: {path: 'employer', model: 'User'}}).sort(sort).exec(function(err, user){
				var projects = user.projects.filter((project) => {
					return project.status === status && project.title !== null;
				})
				var totalProjectCount = projects.length;
				projects = projects.slice(skipRows, req.query.pageNumber * limitRows );
				projects.forEach(function(project){
					project.description = striptags(project.description);	
				});
				res.status(200).json({projects: projects, totalProjectCount: totalProjectCount});
			});
		}
	}
});

router.get("/project/search", middleware.jwt, function(req, res){
	var type = req.query.type;
	var keyword = req.query.keyword;
	var condition;
	
	User.findById(req.user._id, function(err, user){
    	if (err){
    		console.log(err);
    	}else{
    		if (type === "jobPosting"){
				condition = {status: "Open", provider: user, title: new RegExp(keyword, 'i')};
		    }else if (type === "progress"){
		    	condition = {status: "In progress", provider: user, title: new RegExp(keyword, 'i')};
		    }else if (type === "past-project"){
		        condition = {$or:[{status: "Finished"}, {status: "Deleted"}], provider: user, title: new RegExp(keyword, 'i')};
		    }
		    SearchProject(condition, res);
    	}
	});
});

router.get("/balance", middleware.jwt, function(req, res){
	res.status(200).json({currentUser: req.user});	
});

function getSocketId(invoiceNo){
	var socketId;
	currentUsers.forEach(function(currentUser){
		if (currentUser.invoiceNo === invoiceNo){
		    socketId = currentUser.id;
		    return false;
		}	
	});
	return socketId;
}

function SearchProject(condition, res){
	Project.find(condition).populate({path: "winBid", model:"Bid", populate: {path: "bidder", model: "User"}}).exec(function(err, projects){
		projects.forEach(function(project){
			project.description = striptags(project.description);
		});
		res.json({projects:projects});
	});
}

module.exports = router;