var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	status: String,
	isBan: {
  		type: Boolean,
  		default: false
	},
	winBid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "bid"
	},
	bids: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bid"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	employer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	skills: [
		{
			type: String
		}
	],
	category: String,
	title: String,
	budgetType: String,
	description: String,
	postDate: Date,
	endDate: Date,
	budgetMin: Number,
	budgetMax: Number,
	lastModification: Date,
	chosenDate: Date,
	confirmDate: Date,
	finishDate: Date,
	files: [
		{
				fieldname: String,
				originalname: String,
				encoding: String,
				mimetype: String,
				destination: String,
				filename: String,
				path: String,
				size: Number 
		}
	],
	internalStatus:{
		type: Number,
		default: 1
	},  //1 - Select freelancer and deadline, 2 - Submission, 3 - Rating, 4 - Finished
	submissions: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Submission'
		}
    ],
    freelancerRate:{
    		type: mongoose.Schema.Types.ObjectId,
			ref: "Rating"
    },
    	
    employerRate: {
    		type: mongoose.Schema.Types.ObjectId,
			ref: "Rating"
    }

});

module.exports = mongoose.model("Project", ProjectSchema);