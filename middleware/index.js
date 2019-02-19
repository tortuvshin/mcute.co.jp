var User = require("../models/user");
var Transaction = require("../models/transaction");
var Project = require("../models/project");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var jwt2 = require("jsonwebtoken-refresh");
var jwtOptions = require("../jwtOptions")

var middlewareObj = {};

var getToken = function (headers) {
	if (headers.authorization) {
		return headers.authorization;
	} else {
		return null;
	}
};

middlewareObj.isLoggedIn = function (req, res, next){
	if (req.isAuthenticated()){
		return next();
	}

	res.status(400).json({ result: "danger", 
			   title: 'Access Denied',
			   message: "You must login before execute this action."});
}

middlewareObj.jwt = function(req, res, next){
    passport.authenticate('jwt', { session: false }, function(err, user, info) { 
        if (err) { return next(err); } 
        if (!user) { return res.status(401).json({success: false, message: "Custom Unauthorised"}).end(); } 
        
        // Reset the expire time of the token of user
        var token = getToken(req.headers).substr(getToken(req.headers).indexOf(' ') + 1);
		var originalDecoded = jwt.decode(token, {complete: true});
		var refreshed = jwt2.refresh(originalDecoded, Math.floor(Date.now() / 1000) + 21600, jwtOptions.secretOrKey);
        req.user = user;   // Forward user information to the next middleware
        next();
    })(req, res, next);
}

middlewareObj.getUser = function(req, res, next) {
	passport.authenticate('jwt', { session: false }, function(err, user, info) { 
        if (err) { return next(err); } 
        if (!user) { return next(); } 

        req.user = user;   // Forward user information to the next middleware
        next();
    })(req, res, next);
}

middlewareObj.isEmployer = function (req, res, next){
	if (req.user.type === "employer"){
		return next();
	}
	res.status(400).json({ success: false, 
			   message: "You must login as Employer."});
}

middlewareObj.chkUserAccessingPage = function (req, res, next){
	if (req.isAuthenticated()){
		res.redirect("/dashboard");
	}
	return next();
}

middlewareObj.chkUserExist = function(req, res, next){
	var username = req.body['username'];
	var email = req.body['email'];
	
	User.findOne({username: username}, function(err, user){
		if (err){
			console.log(err);
		}else if (user){
			res.status(400).json({ message: "The username is exist. Please try the other one."});

		} else {
			User.findOne({email: email}, function(err, user){
				if (err){
					console.log(err);
				}else if (user){
					res.status(400).json({ message: "The email is exist. Please try the other one."});
				} else {
					return next();
				}
			});
		}
	});
}

middlewareObj.chkProjectOwner = function(req, res, next){
	Project.findById(req.params.id).populate({path: "employer", modal: "User"}).exec(function(err, project){
		if (!project){
			res.status(400).json({success: false, message: "Project not found!"});
		}
		if (req.user.username == project.employer.username){
			console.log("HI");
			return next();
		}
		res.status(400).json({success: false, message: "You are not the project owner!"});
	});
}

middlewareObj.chkProjectFreelancer = function(req, res, next){
	Project.findById(req.params.id).populate({path: "winBid", model: "Bid", populate: {path: "bidder", model: "User"}}).exec(function(err, project){
		if (project.winBid.bidder.username = req.user.username){
			return next();
		}else{
			return res.json({result: "error", message: "You are the freelancer of this project!"});
		}	
	});
}

module.exports = middlewareObj;