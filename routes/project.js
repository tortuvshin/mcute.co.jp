var express = require('express'),
	app = express(),
	router = express.Router(),
	Project = require("../models/project"),
	User = require("../models/user"),
	Comment = require("../models/comment"),
	CommentReply = require("../models/commentReply"),
	Submission = require('../models/submission'),
	Bid = require("../models/bid"),
	Rating = require("../models/rating"),
	middleware = require("../middleware/"),
	fs = require("fs"),
	striptags = require('striptags'),
	upload = require("../middleware/upload"),
	mkdirp = require('mkdirp');

// Searching for projects
router.get("/search", function(req, res){
	var pageNumber = parseInt(req.query.pageNumber) - 1;
	var rowNumber = parseInt(req.query.rowNumber);
	var keyword = req.query.keyword;
	var category = req.query.category;
	var condition;
	
	if (!category){
		condition = {
			$and:[
				{title: new RegExp(keyword, 'i')},
				{status: "open"}
			]
		}
	}else{
		condition = {
		    $and:[
		        {category: category},
		        {title: new RegExp(keyword, 'i')},
		        {status: "open"}
		    ]
		}
	}
	
	Project.aggregate([
		{ $match: condition }, 
		{ $project: {
	        title: 1,
	        category: 1,
	        budgetMin: 1,
	        budgetMax: 1,
	        budgetType: 1,
	        skills: 1,
	        bids: {$size: '$bids'},
	        description: 1,
	        endDate: 1
		  }
		},
		{ $skip: pageNumber * 5 },
		{ $limit: rowNumber },
		{ $sort: {'endDate': 1}}
	], function(err, projects){
		if (err){
			console.log(err);
		} else {
			Project.count(condition, function(err, count) {
			    projects.forEach(function(project){
	        		project.description = striptags(project.description);
	        	});
				res.status(200).json({projects: projects, totalProjectCount: count});
			});
		}	
	});
});

// //Switch pages and return the first ten projects
// router.get("/search/page/:number", function(req, res){
// 	var skipNum = (Number(req.params.number) - 1) * 10;
// 	var keyword = req.query.keyword;
// 	var category = getCategory(Number(req.query.category));
// 	var condition;
	
// 	if (category==""){
// 		condition = {
// 			$and:[
// 				{title: new RegExp(keyword, 'i')},
// 				{status: "Open"}
// 			]
// 		}
// 	}else{
// 		condition = {
// 		    $and:[
// 		        {category: category},
// 		        {title: new RegExp(keyword, 'i')},
// 		        {status: "Open"}
// 		    ]
// 		}
// 	}
	
// 	Project.find(condition).sort({'endDate': 'asc'}).skip(skipNum).limit(10).exec(function(err, projects){
// 		if (err){
// 			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
// 		}else{
// 			projects.forEach(function(project){
//         		project.description = striptags(project.description);
//         	});
// 			res.json({projects: projects});
// 		}
// 	});
// });

//Add a new project
router.post("/", [middleware.jwt, middleware.isEmployer, upload.temp().any()], function(req, res){
	var projectData = req.body;
	projectData.status = "open";
	projectData.postDate = new Date();
	projectData.skills = JSON.parse(projectData.skills);
	if (projectData.budgetType == "fixed"){
		projectData.budgetMax  = projectData.budgetMin;
	}
	
	if (req.user.balance < projectData.budgetMax){
		projectData.status = "drafted";
	}

	projectData.employer = req.user;
	projectData.files = req.files;
	Project.create(projectData, function(err, project){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		} else {
			var dir = './public/uploads/' + req.user.username + '/project/' + project.id;
			mkdirp(dir, function (err) {
	            if (err) {
	            	console.log(err)
	            }else {
	            	var changeFilesPath = new Promise((resolve, reject) => {
	            		project.files.forEach(function(file){
		            		var oldPath = file.path;
		            		var newPath = dir + '/' + file.filename;
		            		file.path = newPath;
		            		fs.rename(oldPath, newPath);
		            	});
		            	project.save(function(err){
		            		resolve();
		            	});
	            	});
	           		
	            	changeFilesPath.then(()=> {
	            		req.user.projects.push(project);
						req.user.save(function(err,user){
							if (req.user.balance < projectData.budgetMax){
								return res.status(400).json({success: false, message: 'You have not enough balance. Please deposit first.'})
							}
							req.user.balance -= projectData.budgetMax;
							req.user.save(function(err, savedUser){
								console.log(savedUser);
								res.status(200).json({
									success: true,
									message: 'A project created successfully',
									projectId: project._id,
									updatedUser: savedUser
								});
							});
						});
	            	});
	            }
	        });
		}
	});
});

router.get("/:id", middleware.getUser, function(req, res){
	var id = req.params.id;
	Project.findById(id).populate("employer").populate("comments").populate({path: 'comments',populate: { path: 'sender' }}).populate({path: 'comments',populate: { path: 'replies', populate: {path: 'sender'}}}).populate({path: 'bids', populate: {path: 'bidder'}}).populate({path: 'winBid', model: 'Bid', populate: {path: 'bidder', model: "User"}}).populate({path: 'submissions', model: 'Submission'}).populate({path: 'freelancerRate', model: 'Rating', populate: {path: 'rater', model: 'User'}}).populate({path: 'employerRate', model: 'Rating', populate: {path: 'rater', model: 'User'}}).exec(function(err, project){
		if (err) {
			return res.status(400).json({message: 'The project is not exist'});
		} else {
			if (!project){
				return res.status(400).json({message: 'The project is not exist'});
			}

			if (req.user){
				Bid.findOne({bidProject: project, bidder: req.user}, function(err, foundBid){
					return res.status(200).json({project: project, bid: foundBid});
				});
			}else{
				
				res.status(200).json({project: project});
			}
		}
	});
});

// Update the project
router.put("/:id",[middleware.jwt, middleware.chkProjectOwner, upload.default("project-post").any()], function(req,res){
	var projectData = req.body;
	projectData.currentFiles = JSON.parse(projectData.currentFiles);
	
	if (projectData.skills !== ""){
		projectData.skills = projectData.skills.split(",");
	}
	
	req.files.forEach(function(file){
		projectData.currentFiles.push(file);	
	});
	
	var updatedData = {
		description: projectData.description,
		budgetMin: projectData.budgetMin,
		budgetMax: projectData.budgetMax,
		budgetType: projectData.budgetType,
		endDate: projectData.endDate,
		skills: projectData.skills,
		title: projectData.title,
		category: projectData.category,
		files: projectData.currentFiles
	}

	if (projectData.budgetType === "fixed"){
		projectData.budgetMax  = projectData.budgetMin;
	}
	
	Project.findByIdAndUpdate(req.params.id, updatedData, {new: true}, function(err, project){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}
		return res.status(200).json({success: true, message: 'The project updated successfully.'});
	});
});

// Delete the project
router.put("/:id/publish", [middleware.jwt, middleware.chkProjectOwner], function(req, res){
	var status = '', message = 'The project is ';
	console.log(req.body.publish);

	Project.findById(req.params.id, function(err, project){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}
		if (req.body.publish === true){
			status = 'open';
			message += 'published.';
			if (req.user.balance < project.budgetMax){
				return res.status(400).json({success: false, message: 'Your have not enough balance. Please deposit first.'})
			}else{
				req.user.balance -= project.budgetMax;
				req.user.save();
			}
		}else {
			status = 'drafted';
			message += 'drafted.';
			req.user.balance += project.budgetMax;
			req.user.save();
		}
		project.status = status;
		project.save(function(err, project){
			if (err){
				return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
			}
			res.status(200).json({success: true, message: message, updatedUser: req.user});
		});
	});
});

//Get project page


//Add a comment of a project
router.post("/:id/comment/", middleware.jwt, function(req, res){
	var comment = {
		content: req.body.content,
		sender: req.user,
		submitDate: new Date()
	}
	Comment.create(comment, function(err, comment){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}else{
			Project.findById(req.params.id, function(err, project){
				if(err){
					return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
				}else{
					project.comments.push(comment);
					project.save(function(err, project){
						if (err){
							return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
						} else {
							res.json({
								success: true,
								message: "The comment has been successfully added."
							});
						}
					});
				}
			});
		}
	});
});

// Get project edit page
router.get("/:id/edit", [middleware.isLoggedIn, middleware.chkProjectOwner], function(req ,res){
	var isOwner = false;

	User.findById(req.user._id).populate("projects").exec(function(err, user){
		user.projects.forEach(function(project){
			if (project._id == req.params.id){
				isOwner = true;
			    return res.render("./project/edit-project", {project:project});
			}
		});
		if (isOwner == false){
			res.render("error", {errorMsg: "You are not the owner of this project!"});
		}
	});

});

// Add reply of a comment
router.post("/:id/comment/reply", middleware.jwt, function(req, res){
	var reply = {
		content: req.body.content,
		sender: req.user,
		submitDate: new Date()
	}
	
	CommentReply.create(reply, function(err, reply){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}else{
			Comment.findById(req.params.id, function(err, comment){
				if (err){
					return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
				} 
				comment.replies.push(reply);
				comment.save(function(err){
					res.json({
						success: true,
						message: "The reply has been successfully added."
					});	
				});
			});
		}
	});
});

router.put("/:id/bid/", middleware.jwt, function(req ,res){
	var amount = req.body.amount;
	var bidId = req.body.bidId;
	
	Bid.findByIdAndUpdate(bidId, {bidPrice: amount, bidDate: new Date()}, function(err, foundBid){
		res.status(200).json({success: true, message: 'The bid updated successfully.'});
	});
});	

// Add bid
router.post("/:id/bid/", middleware.jwt, function(req, res){
	var amount = req.body.amount;
	var result;
	var message;
	
	Project.findById(req.params.id, function(err, project){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}
		
		if (amount < project.budgetMin || amount > project.budgetMax){
			var returnData = {
				result: "error",
				title: "Bid Amount Invalid",
				message: "The bid amount must between the price range!"
			}
			return res.status(400).json(returnData);
		}
		
		var data = {
			bidder: req.user,
			bidPrice: amount,
			bidDate: new Date(),
			bidProject: project
		}
			
		Bid.findOne({bidder: req.user, bidProject: project}, function(err, bid){
			if (err){
				return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
			}
			Bid.create(data, function(err, bid){
				if (err){
					return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
				}
				project.bids.push(bid);
				project.save(function(err){
					if (err){
						return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
					}
					res.status(200).json(
						{
							success: true,
							message: "A bid placed successfully!",
							project: project
						}
					);
				});
			});
		});
	});
});

// Update Project deadline
router.put("/:id/deadline", [middleware.jwt, middleware.chkProjectOwner], function(req, res){
	Project.findById(req.params.id, function(err, project){
		project.chosenDate = new Date(req.body.deadline);
		project.save(function(err, project){
			if (project.chosenDate && project.winBid){
				project.internalStatus = 2;
				project.status = "working";
			}
			project.save(function(err, project){
				res.status(200).json({success: true, message: "The project deadline changed to " + project.chosenDate.toISOString().slice(0,10) + "!"});
			});
		});
	});
});

// Update Project freelancer 
router.post("/:id/freelancer", [middleware.jwt, middleware.chkProjectOwner], function(req, res){
	var bidId = req.body.bidId;
	
	Bid.findById(bidId).populate({path: "bidder", model: 'User'}).exec(function(err, bid){
		Project.findById(req.params.id).populate({path: "employer", model: "User"}).exec(function(err, project){
			project.winBid = bid;
			if (project.chosenDate && project.winBid){
				project.internalStatus = 2;
				project.status = "working";
			}
			project.save(function(err, project){
				User.findById(bid.bidder._id, function(err, user){
					user.projects.push(project);
					user.save(function(err, user){
						var price = project.budgetMax - bid.bidPrice;
						req.user.balance += price;
						req.user.save(function(err, savedUser){
							res.status(200).json({ updatedUser: savedUser, success: true, message: "This project freelancer has selected to " + user.username + ". Also, the $" + price + ' has returned to your wallet.'});
						});
					});
				});
			});
		});
	});
});

router.put("/:id/freelancer", [middleware.jwt, middleware.chkProjectOwner], function(req, res){
	var bidId = req.body.bidId;
	
	Bid.findById(bidId).populate({path: "bidder", model: 'User'}).exec(function(err, bid){
		Project.findById(req.params.id).populate({path: "employer", model: "User"}).populate({path: "winBid", model: "Bid", populate: {path: "bidder", model: "User"}}).exec(function(err, project){
			req.user.balance -= project.budgetMax - project.winBid.bidPrice;
			req.user.save();
			project.winBid = bid;
			project.winBid.bidder.projects.pull({_id: project._id});
			project.winBid.bidder.save()
			
			project.save(function(err, project){
				User.findById(bid.bidder._id, function(err, user){
					user.projects.push(project);
					user.save(function(err, user){
						var price = project.budgetMax - bid.bidPrice;
						req.user.balance += price;
						req.user.save(function(err, savedUser){
							res.status(200).json({ updatedUser: savedUser, success: true, message: "This project freelancer has updated to " + user.username + ".<br>Also, the $" + price + ' has returned to your wallet.'});
						});
					});
				});
			});
		});
	});
});

router.post("/:id/submission",[middleware.jwt, middleware.chkProjectFreelancer, upload.temp().any()], function(req, res){
	Project.findById(req.params.id).populate({path: 'employer', model: 'User'}).exec(function(err, project){
		if (err){
			return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
		}else{
			var submission_data = {
				submitDate: new Date(),
				status: 'waiting for approval'
			}
			
			Submission.create(submission_data, function(err, submission){
				var dir = './public/uploads/' + project.employer.username + '/project/' + project._id + '/submissions/' + submission._id;
				mkdirp(dir, function (err) {
	        		var oldPath = req.files[0].path;
	        		var newPath = dir + '/' + req.files[0].filename;
	        		req.files[0].path = newPath;
	        		fs.rename(oldPath, newPath);
				});
				submission.file = req.files[0];
				submission.save();
				project.submissions.push(submission);
				project.internalStatus = 3;
				project.save(function(err){
					if (err){
						return res.status(400).json({success: false, message: 'An error occured when getting data from database. Please contact us.'})
					}
					res.status(200).json({success: true, message: "The submission file is uploaded successful. Please wait employer for approval"});
				});
			});
		}
	});
});

router.put("/:id/submission/:sid", [middleware.jwt, middleware.chkProjectOwner], function(req, res){
	var result = req.body.result;
	Submission.findById(req.params.sid, function(err, submission){
		submission.status = result;
		submission.save(function(err, savedSubmission){
			Project.findById(req.params.id).populate({path: 'winBid', model: 'Bid', populate: { path: 'bidder', model: 'User'}}).exec(function(err, project){
				if (result === 'approved'){
					project.internalStatus = 4;
					project.status = 'finished';
					project.finishDate = new Date();
					project.winBid.bidder.balance += project.winBid.bidPrice;
					project.winBid.bidder.save();
				}else if (result === 'denied'){
					project.internalStatus = 2;
				}
				project.save(function(err, savedProject){
					return res.status(200).json({success: true, message: 'This submission has been ' + result + '.'});	
				});
			});
		});
	});
});

router.post("/:id/rating",middleware.jwt, function(req, res){
	var data = {
		rater: req.user,
	    ratee: {},
	    rateStar: req.body.rateStar,
	    rateContent: req.body.rateContent,
	    relatedProject: {}
	}
	Project.findById(req.params.id).populate({path: "winBid", model: "Bid", populate: {path: "bidder", model: "User"}}).populate({path: 'employer', model: 'User'}).exec(function(err, project){
		data.relatedProject = project;
		if (req.user.type === "employer"){
			data.ratee = project.winBid.bidder;
			Rating.create(data, function(err, rating){
				project.employerRate = rating;
				Rating.count({ratee: project.winBid.bidder}, function(err, count){
					console.log("asdasdas");
					if (count === 0){
						project.winBid.bidder.rating = rating.rateStar;
					} else {
						project.winBid.bidder.rating =	(project.winBid.bidder.rating * count + rating.rateStar) / (count + 1 )
					}
					project.winBid.bidder.save(function(err, data){
						console.log("abcdefg");
						if (project.freelancerRate){
							project.internalStatus = 5;
						}
						project.save(function(err, project){
							console.log("project saving");
							res.status(200).json({success: true, message: "Rated Successfully"});	
						});
					});
				});
				
			});
		}else if (req.user.type === "freelancer"){
			data.ratee = project.employer;
			Rating.create(data, function(err, rating){
				project.freelancerRate = rating;
				Rating.count({ratee: project.employer}, function(err, count){
					if (count === 0){
						project.employer.rating = rating.rateStar;
					} else {
						project.employer.rating =(project.employer.rating * count + rating.rateStar) / (count + 1 )
					}
					project.employer.save(function(err, data){
						if (project.employerRate){
							project.internalStatus = 5;
						}
						project.save(function(err, project){
							res.status(200).json({success: true, message: "Rated Successfully"});	
						});
					})
				});
				
			});
		}
	});
});

module.exports = router;