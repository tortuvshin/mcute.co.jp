const express = require('express'),
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
	paypal_url = require("../config/paypal");
	

let files = [];


module.exports = {

    index(req, res){
        User.findById(req.user._id).populate({path: 'transaction',populate: { path: 'bankDeposit', model: 'BankDeposit'}}).populate({path: "projects", model: "Project"}).populate({path:"projects", populate: {path: "winBid", model:"Bid", populate: {path: "bidder", model: "User"}}}).exec(function(err, foundUser){
            if(err){
                console.log(err);
            } else {
                if (req.user.type === "freelancer"){
                    let outputProject = {
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
    },


    profile(req, res){
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
            let updatedUser = {
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
    },


    security(req, res){
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const repeatPassword = req.body.repeatPassword
        
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
    },




    project(req, res){
        const status = req.query.status;
        const keyword = req.query.keyword;
        const limitRows = parseInt(req.query.rowNumber);
        const skipRows = (parseInt(req.query.pageNumber) - 1) * limitRows;
        
        if (req.user.type === "employer"){
            let condition = {
                $and:[
                    {employer: req.user._id},
                    {title: new RegExp(keyword, 'i')},
                    {status: status}
                ]
            }
            
            let sort = {}
            
            if (status === 'working'){
                sort.chosenDate = 1;
            }else {
                sort.endDate = 1;
            }
            
            Project.find(condition).sort(sort).skip(skipRows).limit(limitRows).populate({path: 'bids', model: 'Bid', populate: { path: 'bidder', model: 'User'}}).populate({path: "winBid", model: 'Bid', populate: {path: "bidder", model: "User"}}).exec(function(err, projects){
                Project.count(condition, function(err, count){
                    let output = [];
                    projects.forEach(function(project){
                        project.description = striptags(project.description);
                        output.push(project);
                    });
                    res.status(200).json({projects: output, totalProjectCount: count});
                });
            });

        } else if (req.user.type === "freelancer"){
            let output = [];
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
                    const totalProjectCount = bids.length;
                    console.log(totalProjectCount);
                    bids = bids.slice(skipRows, req.query.pageNumber * limitRows );
                    bids.forEach(function(bid){
                        bid.bidProject.description = striptags(bid.bidProject.description);	
                    });
                    res.status(200).json({bids: bids, totalProjectCount: totalProjectCount});
                });
            } else {
                let sort = {}
                if (status === 'working'){
                    sort['project.chosenDate'] = 1;
                }else if (status === 'finished'){
                    sort['project.finishDate'] = 1;
                }
                User.findById(req.user._id).populate({path:"projects", match: { title: new RegExp(keyword, 'i'), status: status }, populate: {path: 'employer', model: 'User'}}).sort(sort).exec(function(err, user){
                    let projects = user.projects.filter((project) => {
                        return project.status === status && project.title !== null;
                    })
                    let totalProjectCount = projects.length;
                    projects = projects.slice(skipRows, req.query.pageNumber * limitRows );
                    projects.forEach(function(project){
                        project.description = striptags(project.description);	
                    });
                    res.status(200).json({projects: projects, totalProjectCount: totalProjectCount});
                });
            }
        }
    },

    projectSearch(req, res){
        const type = req.query.type;
        const keyword = req.query.keyword;
        let condition;
        
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
                Project.find(condition).populate({path: "winBid", model:"Bid", populate: {path: "bidder", model: "User"}}).exec(function(err, projects){
                    projects.forEach(function(project){
                        project.description = striptags(project.description);
                    });
                    res.json({projects:projects});
                });
            
            }
        });
    },

    balance(req, res){
        res.status(200).json({currentUser: req.user});	
    },

    getSocketId(invoiceNo){
        let socketId;
        currentUsers.forEach(function(currentUser){
            if (currentUser.invoiceNo === invoiceNo){
                socketId = currentUser.id;
                return false;
            }	
        });
        return socketId;
    }

}
