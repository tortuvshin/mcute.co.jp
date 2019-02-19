var express = require('express'),
	app= express(),
	router = express.Router(),
	User = require("../models/user"),
	middleware = require("../middleware/index"),
	Rating = require('../models/rating');
	
router.get("/review", (req, res) => {
    var username = req.query.username;
    
    User.findOne({username: username}, function(err, user){
         Rating.find({ratee: user._id}).populate({path: 'relatedProject', model: "Project"}).populate({path: 'rater', model: 'User'}).exec(function(err, ratings){
            res.status(200).json({reviews: ratings}); 
         });
    });
});

router.get("/:username", (req, res)=>{
    User.findOne({ username: req.params.username }, (err, foundUser)=> {
        if (!foundUser){
            return res.status(400).json({ message: "User not found" });
        } 
        res.status(200).json({ user: foundUser });
    });
});

router.put("/:username", middleware.jwt, (req, res)=>{
    User.findById(req.user._id, (err, foundUser)=> {
        foundUser.profile = req.body.updatedProfile;
        foundUser.save((err, updatedUser)=> {
            res.status(200).json({ success: true, updatedUser: updatedUser, message: 'The profile updated successfully' });
        });
    });
});

module.exports = router;