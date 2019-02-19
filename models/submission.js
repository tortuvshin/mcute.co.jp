var mongoose = require('mongoose');

var SubmissionSchema = new mongoose.Schema({
    file:{
    	status: String,
    	submitDate: Date,
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number 
    },
    submitDate: Date,
    status: String
});

module.exports = mongoose.model("Submission", SubmissionSchema);