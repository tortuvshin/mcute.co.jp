var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
    rater: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "User"
    },
    ratee: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "User"
    },
    rateStar: {
        type: Number,
        required: true
    },
    rateContent: {
        type: String,
        required: true
    },
    relatedProject: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
    }
});

module.exports = mongoose.model("Rating", RatingSchema);