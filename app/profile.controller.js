const User = require("../models/user"),
	Rating = require('../models/rating');
    
module.exports = {
    review (req, res){
        const username = req.query.username;
        
        User.findOne({username: username}, function(err, user){
             Rating.find({ratee: user._id}).populate({path: 'relatedProject', model: "Project"}).populate({path: 'rater', model: 'User'}).exec(function(err, ratings){
                res.status(200).json({reviews: ratings}); 
             });
        });
    },
    
    viewProfile (req, res) {
        User.findOne({ username: req.params.username }, (err, foundUser)=> {
            if (!foundUser){
                return res.status(400).json({ message: "User not found" });
            } 
            res.status(200).json({ user: foundUser });
        });
    },
    
    updateProfile (req, res) {
        User.findById(req.user._id, (err, foundUser)=> {
            foundUser.profile = req.body.updatedProfile;
            foundUser.save((err, updatedUser)=> {
                res.status(200).json({ success: true, updatedUser: updatedUser, message: 'The profile updated successfully' });
            });
        });
    }
}	
